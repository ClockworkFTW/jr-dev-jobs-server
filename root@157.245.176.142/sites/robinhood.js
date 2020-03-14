const company = "Robinhood";
const logo = "https://cdn.worldvectorlogo.com/logos/robinhood-1.svg";
const url =
  "https://boards.greenhouse.io/embed/job_board?for=robinhood&b=https%3A%2F%2Fcareers.robinhood.com%2Fopenings";

const getData = async page => {
  // Extract data from job list
  const jobs = await page.evaluate(
    (company, logo) => {
      const elements = Array.from(
        document.querySelectorAll('div[department_id="19564"]')
      );
      return elements.map(e => {
        const title = e.querySelector("a").textContent;
        const location = e.querySelector("span").textContent;
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
