const { filters, technologies } = require("../config");

const filterJobs = (jobs) =>
  jobs.filter((job) => {
    let pass = true;
    filters.forEach((filter) => {
      if (job.title.toLowerCase().includes(filter)) {
        pass = false;
      }
    });
    return pass;
  });

const getTech = (description) =>
  technologies
    .map((technology) => {
      const regex = new RegExp(technology, "g");
      const count = (description.match(regex) || []).length;
      return [technology, count];
    })
    .filter((e) => e[1] !== 0);

// Credit: Anand Mahajan (https://stackoverflow.com/questions/52497252/puppeteer-wait-until-page-is-completely-loaded?rq=1)
const waitHTML = async (page, timeout = 30000) => {
  const checkDurationMsecs = 1000;
  const maxChecks = timeout / checkDurationMsecs;
  let lastHTMLSize = 0;
  let checkCounts = 1;
  let countStableSizeIterations = 0;
  const minStableSizeIterations = 3;

  while (checkCounts++ <= maxChecks) {
    let html = await page.content();
    let currentHTMLSize = html.length;

    if (lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize)
      countStableSizeIterations++;
    else countStableSizeIterations = 0; //reset the counter

    if (countStableSizeIterations >= minStableSizeIterations) {
      break;
    }

    lastHTMLSize = currentHTMLSize;
    await page.waitFor(checkDurationMsecs);
  }
};

module.exports = { filterJobs, getTech, waitHTML };
