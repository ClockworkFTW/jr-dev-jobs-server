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
      const elements = Array.from(document.querySelectorAll("a[data-job-id]"));

      return elements.map((e) => {
        const title = e.querySelector("h2").textContent;
        const link = `https://jobs.ebayinc.com${e.getAttribute("href")}`;
        const location = e.querySelector("span").textContent;
        return { title, link, location };
      });
    });

    browser.close();

    return jobs;
  } catch (error) {
    throw error;
  }
};
