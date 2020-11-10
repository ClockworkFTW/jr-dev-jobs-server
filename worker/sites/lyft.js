const puppeteer = require("puppeteer");

const { waitTillHTMLRendered } = require("../util");

module.exports = async (url) => {
  try {
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.goto(url, { timeout: 10000, waitUntil: "load" });
    await waitTillHTMLRendered(page);

    // Expand engineer job list
    const button = await page.$("div.dmasbq div:nth-child(25) > button");
    if (button !== null) {
      await button.click();
    }

    // Extract data from job list
    const jobs = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll("a._1HcI2i"));
      return elements.map((e) => {
        const title = e.querySelector("h3").textContent;
        const location = e.querySelector("p").textContent;
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
