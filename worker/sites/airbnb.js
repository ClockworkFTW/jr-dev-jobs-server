const puppeteer = require("puppeteer");

const { waitTillHTMLRendered } = require("../util");

module.exports = async (url) => {
  try {
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.goto(url, { timeout: 10000, waitUntil: "load" });
    await waitTillHTMLRendered(page);

    // Filter for engineering jobs
    const dropdown = await page.$("div.jobs-board__departments__dropdown");
    if (dropdown !== null) {
      await dropdown.click();
      const option = await page.$("div#react-select-3-option-5");
      if (option !== null) {
        await option.click();
      }
    }

    // Extract data from job list
    const jobs = await page.evaluate(() => {
      const elements = Array.from(
        document.querySelectorAll("li.jobs-board__positions__list__item")
      );
      return elements.map((e) => {
        const title = e.querySelector("h3").textContent;
        const location = e.querySelector("span").textContent;
        const link = e.querySelector("a").getAttribute("href");
        return { title, link, location };
      });
    });

    browser.close();

    return jobs;
  } catch (error) {
    throw error;
  }
};
