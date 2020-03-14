const company = "Pinterest";
const logo = "https://cdn.worldvectorlogo.com/logos/robinhood-1.svg";
const url =
  "https://www.pinterestcareers.com/jobs/search?page=1&department_uids%5B%5D=70a034e7e24e66ce7ab45e19a7cd484d&query=";

const getData = async page => {
  // Extract data from job list
  const jobs = await page.evaluate(
    (company, logo) => {
      const elements = Array.from(
        document
          .querySelector("div.job-search-results-table")
          .querySelectorAll("tbody > tr")
      );
      return elements.map(e => {
        const title = e.querySelector("a").textContent;
        const location = e.querySelector("td.job-search-results-location")
          .textContent;
        const link = e.querySelector("a").getAttribute("href");
        return { company, title, location, logo, link };
      });
    },
    company,
    logo
  );

  return jobs;
};

module.exports = { company, url, getData };
