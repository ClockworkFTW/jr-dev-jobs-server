const puppeteer = require("puppeteer");

const { waitTillHTMLRendered } = require("../util");

module.exports = async (url) => {
  try {
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.goto(url, { timeout: 10000, waitUntil: "load" });
    await waitTillHTMLRendered(page);

    const jobs = await page.evaluate(() => {
      const elements = Array.from(
        document.querySelectorAll("li.open-positions__listing")
      );

      return elements.map((e) => {
        const title = e.querySelector("h5.open-positions__listing-title")
          .textContent;
        const link = `https://www.dropbox.com${e
          .querySelector("a.open-positions__listing-link")
          .getAttribute("href")}`;
        const location = e
          .querySelector("p.open-positions__listing-location")
          .textContent.split(";")[0];
        return { title, link, location };
      });
    });

    browser.close();

    return jobs;
  } catch (error) {
    throw error;
  }
};
