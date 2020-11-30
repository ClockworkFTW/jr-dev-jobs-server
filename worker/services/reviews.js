const puppeteer = require("puppeteer");
const { indeed } = require("../config");

module.exports = async (company) => {
  try {
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();
    const url = `https://www.indeed.com/cmp/${company}`;
    await page.goto(url);

    const reviews = await page.evaluate((indeed) => {
      const arr = [];

      const overall = document.querySelector(indeed.overallReview).innerHTML;

      arr.push(["Overall", Number(overall).toFixed(1)]);

      const rest = Array.from(document.querySelectorAll(indeed.reviews));

      rest.forEach((e) => {
        const category = e.querySelector(indeed.reviewCategory).innerText;
        const rating = Number(
          e.querySelector(indeed.reviewRating).innerText
        ).toFixed(1);

        arr.push([category, rating]);
      });

      return arr;
    }, indeed);

    browser.close();

    return reviews;
  } catch (error) {
    throw error;
  }
};
