const redis = require("redis");
const client = redis.createClient();
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const moment = require("moment");

// Filter out jobs that already exist in Redis
const filterBySaved = async (jobs) => {
  try {
    let oldJobs = await getAsync("jobs");
    if (!oldJobs) return jobs;
    oldJobs = JSON.parse(oldJobs);
    return jobs.filter((a) => !oldJobs.find((b) => b.id == a.id));
  } catch (error) {
    return jobs;
  }
};

// Save single job to Redis
const saveJob = async (job) => {
  try {
    let jobs = await getAsync("jobs");
    if (jobs) {
      jobs = JSON.parse(jobs);
      jobs = JSON.stringify([...jobs, job]);
      await setAsync("jobs", jobs);
    } else {
      jobs = JSON.stringify([job]);
      await setAsync("jobs", jobs);
    }
  } catch (error) {
    return;
  }
};

// Remove jobs older than 2 weeks from Redis
const clearOldJobs = async () => {
  try {
    let jobs = await getAsync("jobs");
    if (!jobs) return 0;
    jobs = JSON.parse(jobs);
    const jobCount = jobs.length;
    jobs = jobs.filter((job) =>
      moment(job.time).isAfter(moment().subtract(14, "days"))
    );
    const clearCount = jobs.length;
    jobs = JSON.stringify(jobs);
    await setAsync("jobs", jobs);
    return jobCount - clearCount;
  } catch (error) {
    return 0;
  }
};

module.exports = { filterBySaved, saveJob, clearOldJobs };
