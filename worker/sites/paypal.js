const puppeteer = require("puppeteer");

const { waitTillHTMLRendered } = require("../util");

module.exports = async (url) => {
  try {
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.goto(url, { timeout: 10000, waitUntil: "load" });
    await waitTillHTMLRendered(page);

    // Extract data from job list
    const jobs = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll("tr.job-result"));

      return elements.map((e) => {
        const title = e.querySelector("a.job-result-title").textContent;
        const location = e.querySelector("div.job-location-line").textContent;
        const link = `https://jobsearch.paypal-corp.com${e
          .querySelector("a.job-result-title")
          .getAttribute("href")}`;
        return { title, link, location };
      });
    });

    browser.close();

    return jobs;
  } catch (error) {
    throw error;
  }
};
