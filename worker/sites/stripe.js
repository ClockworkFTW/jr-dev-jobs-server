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
      const elements = Array.from(document.querySelectorAll("li.sc-EHOje"));

      return elements.map((e) => {
        const title = e.querySelector("a > div").textContent;
        const link = `https://stripe.com${e
          .querySelector("a")
          .getAttribute("href")}`;
        const location = e.querySelector("div.sc-ifAKCX > span").textContent;
        return { title, link, location };
      });
    });

    return jobs;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
