// Set max listener limit to 100 (default is 10)
require("events").EventEmitter.defaultMaxListeners = 100;

// Import npm packages
const hash = require("object-hash");

// Import and promisify redis
const redis = require("redis");
const client = redis.createClient();
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Import and declare chalk status's
const chalk = require("chalk");
const notification = chalk.bold.blue;
const success = chalk.green;
const error = chalk.red;

// Other imports
const companies = require("./config");
const getSalary = require("./services/salary");
const getReviews = require("./services/reviews");
const getCoords = require("./services/geocode");
const getListing = require("./services/listing");
const { filterJobs } = require("./util");

const scrape = async () => {
  // Log starting timestamp
  console.log(notification(`Job scraping initiated: ${new Date()}`));

  // Map over companies in sequence and fetch data
  let data = [];

  for (const company of companies) {
    try {
      // Get salary and reviews
      const salary = await getSalary(company.company);
      const reviews = await getReviews(company.company);

      // Get jobs
      let jobs = await company.getJobs(company.link);
      // Filter out non junior positions
      jobs = filterJobs(jobs);
      // Add salary and rest of company object
      jobs = jobs.map((job) => ({ ...company, ...job, salary, reviews }));
      // Add coordinates
      jobs = await Promise.all(jobs.map(async (job) => getCoords(job)));
      // Add listing
      jobs = await Promise.all(jobs.map(async (job) => getListing(job)));

      console.log(success(`pass: ${company.company} (${jobs.length})`));
      data.push(jobs);
    } catch (err) {
      console.log(error(`fail: ${company.company}`));
    }
  }

  // Flatten jobs array and add unique id and timestamp
  data = data
    .flat()
    .filter((job) => job)
    .map((job) => ({ ...job, id: hash(job), time: new Date() }));

  // Fetch and parse old jobs from Redis
  let oldData = await getAsync("jobs");
  oldData = JSON.parse(oldData);

  // If job already exists keep it otherwise return new job
  data = data.map((a) => {
    let existingJob = null;
    oldData.forEach((b) => {
      if (b.id === a.id) {
        existingJob = b;
      }
    });
    return existingJob ? existingJob : a;
  });

  // Save updated jobs array to Redis
  await setAsync("jobs", JSON.stringify(data));

  // Log completed timestamp
  console.log(notification(`Job scraping completed: ${new Date()}`));
};

// Initialize and call cron job
const CronJob = require("cron").CronJob;

const job = new CronJob(
  "0 */12 * * *",
  scrape,
  null,
  true,
  "America/Los_Angeles"
);

job.start();
