const filterJobs = (jobs) => {
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
    "principal",
    "staff",
  ];

  return jobs.filter((job) => {
    let pass = true;
    keywords.forEach((keyword) => {
      if (job.title.toLowerCase().includes(keyword)) {
        pass = false;
      }
    });
    return pass;
  });
};

// Credit: Anand Mahajan (https://stackoverflow.com/questions/52497252/puppeteer-wait-until-page-is-completely-loaded?rq=1)

const waitTillHTMLRendered = async (page, timeout = 30000) => {
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

module.exports = { filterJobs, waitTillHTMLRendered };
