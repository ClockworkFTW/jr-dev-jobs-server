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
      const elements = Array.from(
        document.querySelectorAll('div[data-job-role="Software Engineering"]')
      );

      return elements.map((e) => {
        const title = e.querySelector("a").textContent;
        const link = e.querySelector("a").getAttribute("href");
        const location = e.querySelector("div:nth-child(3)").textContent;
        return { title, link, location };
      });
    });
    return jobs;
  } catch (error) {
    throw error;
  }
};
