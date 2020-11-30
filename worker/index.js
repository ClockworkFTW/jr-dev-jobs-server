let { companies } = require("./config");
const getJobs = require("./services/jobs");
const getSalary = require("./services/salary");
const getReviews = require("./services/reviews");
const getDetails = require("./services/details");
const { filterBySaved, saveJob, clearOldJobs } = require("./services/redis");
const { filterByLevel, filterByTime } = require("./util");

// Import and declare chalk status's
const chalk = require("chalk");
const notification = chalk.bold.blue;
const success = chalk.green;
const error = chalk.red;

const ProgressBar = require("progress");

const scrape = async () => {
  // Log starting timestamp
  console.log(notification(`Job scraping initiated: ${new Date()}`));

  // Clear jobs older than 2 weeks from Redis
  const clearCount = await clearOldJobs();
  console.log(`${clearCount} expired jobs cleared`);

  // Iterate over company array 3 times or until all companies passed
  const attempts = 3;
  companies = companies.map((c) => ({ ...c, pass: false }));

  for (let i = 0; i < attempts; i++) {
    console.log(`Job fetch attempt ${i + 1}/${attempts}`);

    // Loop over companies and fetch jobs
    for (let j = 0; j < companies.length; j++) {
      // Skip loop if company has already passed
      const { company, logo, pass } = companies[j];
      if (pass) continue;
      console.log(success(`start: ${company}`));

      try {
        // Get salary and reviews
        const salary = await getSalary(company);
        console.log(success(`${company} salary fetched`));
        const reviews = await getReviews(company);
        console.log(success(`${company} reviews fetched`));

        // Get jobs, filter out non junior positions and attach fetched values
        console.log(success(`${company} fetching jobs...`));
        let jobs = await getJobs(company);
        console.log(success(`${company} ${jobs.length} jobs fetched`));

        // Filter out undesired jobs and append additional details
        jobs = filterByLevel(jobs);
        jobs = filterByTime(jobs);
        jobs = await filterBySaved(jobs);
        jobs = jobs.map((job) => {
          return { ...job, company, logo, salary, reviews };
        });
        console.log(success(`${company} ${jobs.length} jobs filtered`));

        if (jobs.length > 0) {
          // Create jobs progress bar
          const bar = new ProgressBar(`${company} [:bar] :etas`, {
            total: jobs.length,
            width: 20,
          });

          // Add details and save to Redis
          console.log(success(`${company} saving jobs...`));
          for (let k = 0; k < jobs.length; k++) {
            let job = jobs[k];
            job = await getDetails(job);
            if (job) await saveJob(job);
            bar.tick();
          }
        }

        // Set pass filter to true
        companies = companies.map((c) => {
          if (c.company === company) {
            return { ...c, pass: true };
          } else {
            return c;
          }
        });

        // Log company success message
        console.log(success(`pass: ${company}`));
      } catch (err) {
        // Log company failure message
        console.log(error(`fail: ${company}`));
      }
    }
  }

  // Log ending timestamp
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
