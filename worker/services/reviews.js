const puppeteer = require("puppeteer");

module.exports = async (company) => {
  try {
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();
    const url = `https://www.indeed.com/cmp/${company}`;
    await page.goto(url);

    const reviews = await page.evaluate(() => {
      const arr = [];

      const overall = document.querySelector(
        "g.cmp-RatingsGraphMarkerText-highlight > text"
      ).innerHTML;

      arr.push(["Overall", Number(overall).toFixed(1)]);

      const rest = Array.from(document.querySelectorAll("div.css-1h13g5j"));

      rest.forEach((e) => {
        const category = e.querySelector("span").innerText;
        const rating = Number(e.querySelector("div").innerText).toFixed(1);

        arr.push([category, rating]);
      });

      return arr;
    });

    browser.close();

    return reviews;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
