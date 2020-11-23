const puppeteer = require("puppeteer");

const getSalary = async (company) => {
  try {
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();

    const url = `https://www.levels.fyi/company/${company}/salaries/Software-Engineer/`;
    await page.goto(url);

    // Expand table rows if hidden
    const button = await page.$("a.view-more-levels");
    if (button !== null) {
      await button.click();
    }

    const data = await page.evaluate(() => {
      const columns = Array.from(
        document.querySelectorAll(
          "table.salary-by-level-table > thead > tr > th"
        )
      ).map((column) => column.innerText);

      const rows = Array.from(
        document.querySelectorAll(
          "table.salary-by-level-table > tbody > tr.level-salary-row"
        )
      );

      const levels = rows.map((row) => {
        const cells = Array.from(row.querySelectorAll("td"));

        return cells.map((cell) => cell.querySelector("p").innerText);
      });

      let salaries = [];

      levels.forEach((level) => {
        let salary = {};
        level.forEach((e, i) => (salary[columns[i]] = e));
        salaries.push(salary);
      });

      return salaries;
    });

    browser.close();

    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = getSalary;
