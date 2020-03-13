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

  // Wait for job promises to resolve, flatten array, add unique id and save to redis
  let jobs = await Promise.all(promises);
  jobs = jobs.flat().filter(job => job);
  jobs = jobs.map(job => ({ ...job, id: hash(job), time: new Date() }));
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
