require("events").EventEmitter.defaultMaxListeners = 15;
var hash = require("object-hash");

// Import puppeteer and set up stealth plugin
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

// Import and promisify redis
const redis = require("redis");
const client = redis.createClient();
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const getCoords = require("./services/google");

const sites = require("./sites");
const { notification, success, error, filterJobs } = require("./util");

const scrape = async () => {
  // Log cron job start timestamp
  console.log(notification(`Page scraping initiated: ${new Date()}`));

  // Map over each site and fetch data asynchronously
  const promises = sites.map(async site => {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null
      });
      const page = await browser.newPage();
      await page.goto(site.url);

      let data = await site.getData(page);
      data = filterJobs(data);

      const coordsPromises = data.map(job => getCoords(job));
      const dataWithCoords = await Promise.all(coordsPromises);

      browser.close();

      console.log(success(`pass: ${site.company}`));
      return dataWithCoords;
    } catch (err) {
      console.log(error(`fail: ${site.company}`));
    }
  });

  // Wait for job promises to resolve
  let jobs = await Promise.all(promises);

  // Flatten jobs array
  jobs = jobs.flat().filter(job => job);

  // Add unique id and timestamp
  jobs = jobs.map(job => ({ ...job, id: hash(job), time: new Date() }));

  // Fetch and parse old jobs from Redis
  let oldJobs = await getAsync("jobs");
  oldJobs = JSON.parse(oldJobs);

  // If job already exists keep it otherwise return new job
  jobs = jobs.map(job => {
    let existingJob = null;
    oldJobs.forEach(oldJob => {
      if (oldJob.id === job.id) {
        existingJob = oldJob;
      }
    });
    return existingJob ? existingJob : job;
  });

  // Save updated jobs array to Redis
  await setAsync("jobs", JSON.stringify(jobs));

  // Log cron job stop timestamp
  console.log(notification(`Page scraping completed: ${new Date()}`));
};

// Initialize cron job and execute
// const CronJob = require("cron").CronJob;

// const job = new CronJob(
//   " * * * * *",
//   scrape,
//   null,
//   true,
//   "America/Los_Angeles"
// );

// job.start();

scrape();
