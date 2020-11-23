const getJobs = require("./services/jobs");
const getSalary = require("./services/salary");
const getReviews = require("./services/reviews");
const getDetails = require("./services/details");
const saveJob = require("./services/save");
const { companies } = require("./config");
const { filterJobs } = require("./util");

// Import and declare chalk status's
const chalk = require("chalk");
const notification = chalk.bold.blue;
const success = chalk.green;
const error = chalk.red;

const scrape = async () => {
  // Log starting timestamp
  console.log(notification(`Job scraping initiated: ${new Date()}`));

  // Loop over companies and fetch jobs
  for (let i = 0; i < companies.length; i++) {
    // Destructure company name and logo
    const { company, logo } = companies[i];
    console.log(success(`start: ${company}`));

    try {
      // Get salary and reviews
      const salary = await getSalary(company);
      console.log(success(`${company} salary fetched`));
      const reviews = await getReviews(company);
      console.log(success(`${company} reviews fetched`));

      // Get jobs, filter out non junior positions and attach fetched values
      let jobs = await getJobs(company);
      jobs = filterJobs(jobs);
      jobs = jobs.map((job) => ({ ...job, company, logo, salary, reviews }));

      // Add details and save to Redis
      for (let j = 0; j < jobs.length; j++) {
        let job = jobs[j];
        job = await getDetails(job);
        await saveJob(job, `${company} job ${j}/${jobs.length}`);
      }

      console.log(success(`pass: ${company}`));
    } catch (err) {
      console.log(error(`fail: ${company}`));
    }
  }

  // Log ending timestamp
  console.log(notification(`Job scraping completed: ${new Date()}`));
};

// // Initialize and call cron job
// const CronJob = require("cron").CronJob;

// const job = new CronJob(
//   "0 */12 * * *",
//   scrape,
//   null,
//   true,
//   "America/Los_Angeles"
// );

// job.start();

scrape();
