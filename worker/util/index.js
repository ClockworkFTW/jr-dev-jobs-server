const chalk = require("chalk");

const notification = chalk.bold.blue;
const success = chalk.green;
const error = chalk.red;

const filterJobs = jobs => {
  const keywords = [
    "director",
    "manager",
    "senior",
    "lead",
    "head",
    "internship",
    "intern",
    "university",
    "grad",
    "sr.",
    "principal"
  ];

  return jobs.filter(job => {
    let pass = true;
    keywords.forEach(keyword => {
      if (job.title.toLowerCase().includes(keyword)) {
        pass = false;
      }
    });
    return pass;
  });
};

module.exports = { notification, success, error, filterJobs };
