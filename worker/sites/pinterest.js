const puppeteer = require("puppeteer");

const { waitTillHTMLRendered } = require("../util");

module.exports = async (url) => {
  try {
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.goto(url, { timeout: 10000, waitUntil: "load" });
    await waitTillHTMLRendered(page);

    // Select engineer job list
    const button = await page.$("input#filter_department_1_0_0");
    if (button !== null) {
      await button.click();
    }

    const jobs = await page.evaluate(() => {
      const elements = Array.from(
        document.querySelectorAll(
          "div.job-search-results-table > table > tbody > tr"
        )
      );

      return elements.map((e) => {
        const title = e.querySelector("a").textContent;
        const link = e.querySelector("a").getAttribute("href");
        const location = e.querySelector("td.job-search-results-location")
          .textContent;
        return { title, link, location };
      });
    });

    browser.close();

    return jobs;
  } catch (error) {
    throw error;
  }
};
