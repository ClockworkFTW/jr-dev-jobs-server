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
        document.querySelectorAll("span.mat-content")
      );

      return elements.map((e) => {
        const title = e.querySelector("a.job-title-link > span").textContent;
        const link = `https://careers.vmware.com/${e
          .querySelector("a.job-title-link")
          .getAttribute("href")}`;
        const location = e.querySelector("span.location").textContent;
        return { title, link, location };
      });
    });

    return jobs;
  } catch (error) {
    throw error;
  }
};
