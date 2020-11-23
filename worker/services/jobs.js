const puppeteer = require("puppeteer");
const { waitHTML } = require("../util");
const { indeed, browserArgs } = require("../config");

module.exports = async (company) => {
  try {
    // Launch puppeteer browser, navigate to page and wait for HTML to load
    const browser = await puppeteer.launch({ args: browserArgs });
    const page = await browser.newPage();
    const url = `https://www.indeed.com/cmp/${company}/jobs?q=&l=&c=techsoftware`;
    await page.goto(url, { timeout: 10000, waitUntil: "load" });
    await waitHTML(page);

    let jobs = await page.evaluate((indeed) => {
      // Create array of job posting elements
      const elements = Array.from(document.querySelectorAll(indeed.posting));

      // Extract values from job postings
      return elements.map((e) => {
        const link = e.getAttribute(indeed.id).split(",")[1];
        const title = e.querySelector(indeed.title).textContent;
        const location = e.querySelector(indeed.location).textContent;
        const time = e.querySelector(indeed.time).textContent;
        return { link, title, location, time };
      });
    }, indeed);

    browser.close();

    return jobs;
  } catch (error) {
    throw error;
  }
};
