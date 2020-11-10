const puppeteer = require("puppeteer");

const { waitTillHTMLRendered } = require("../util");

module.exports = async (url) => {
  try {
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.goto(url, { timeout: 10000, waitUntil: "load" });
    await waitTillHTMLRendered(page);

    // Select engineer job list
    const button = await page.$("div.pb-md-6 div:nth-child(3) > div > button");
    if (button !== null) {
      await button.click();
    }

    // Extract data from job list
    const jobs = await page.evaluate(() => {
      const elements = Array.from(
        document.querySelectorAll("div.Details--on > ul > a")
      );
      return elements.map((e) => {
        const title = e.querySelector("span").textContent;
        const location = e.querySelector("span.d-block").textContent;
        const link = e.getAttribute("href");
        return { title, link, location };
      });
    });

    browser.close();

    return jobs;
  } catch (error) {
    throw error;
  }
};
