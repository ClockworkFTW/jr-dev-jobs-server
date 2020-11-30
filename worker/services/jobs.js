const puppeteer = require("puppeteer");
const { waitHTML } = require("../util");
const { indeed, browserArgs } = require("../config");

module.exports = async (company) => {
  try {
    // Create puppeteer browser and page
    const browser = await puppeteer.launch({ args: browserArgs });
    const page = await browser.newPage();
    const baseURL = `https://www.indeed.com/cmp/${company}/jobs?q=&l=United+States&c=techsoftware`;
    await page.goto(baseURL, { timeout: 10000, waitUntil: "load" });
    await waitHTML(page);

    // Determine page count (150 results per page)
    // prettier-ignore
    const pages = await page.evaluate((indeed) => {
      const count = document.querySelector(indeed.count).textContent.split(" ")[0];
      return Math.floor(parseFloat(count.replace(/,/g, "")) / 150);
    }, indeed);

    let jobs = [];

    // Loop through pages and extract data
    for (let i = 0; i <= pages; i++) {
      // Navigate to indeed page
      const url = `${baseURL}&start=${i * 150}`;
      await page.goto(url, { timeout: 10000, waitUntil: "load" });
      await waitHTML(page);

      // Extract values from job postings
      const data = await page.evaluate((indeed) => {
        const postings = Array.from(document.querySelectorAll(indeed.posting));
        return postings.map((e) => {
          const id = e.getAttribute(indeed.id).split(",")[1];
          const link = `https://indeed.com/rc/clk?jk=${id}`;
          const title = e.querySelector(indeed.title).textContent;
          const location = e.querySelector(indeed.location).textContent;
          const time = e.querySelector(indeed.time).textContent;
          return { id, link, title, location, time };
        });
      }, indeed);

      // Append data to jobs array
      jobs = [...jobs, ...data];
    }

    browser.close();

    return jobs;
  } catch (error) {
    throw error;
  }
};
