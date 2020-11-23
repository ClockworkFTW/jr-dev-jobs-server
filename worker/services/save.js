const redis = require("redis");
const client = redis.createClient();
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const hash = require("object-hash");

module.exports = async (job, progress) => {
  // If no job was provided, log and return
  if (!job) {
    console.log(`${progress} not saved`);
    return;
  }

  try {
    // Add id to new job
    const newJob = { ...job, id: hash(job) };

    // Fetch and parse old jobs from Redis
    let oldJobs = await getAsync("jobs");

    // If there are old jobs, overwrite with new jobs and save to Redis
    if (oldJobs) {
      oldJobs = JSON.parse(oldJobs);
      let newJobs = oldJobs.filter((oldJob) => oldJob.id !== newJob.id);
      newJobs = [...newJobs, newJob];
      await setAsync("jobs", JSON.stringify(newJobs));
    }
    // Else, create a new job array and save to Redis
    else {
      await setAsync("jobs", JSON.stringify([job]));
    }
    console.log(`${progress} saved`);
  } catch (error) {
    console.log(`${progress} not saved`);
  }
};
