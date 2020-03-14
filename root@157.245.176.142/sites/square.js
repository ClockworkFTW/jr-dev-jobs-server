const company = "Square";
const logo = "https://cdn.worldvectorlogo.com/logos/square.svg";
const url =
  "https://careers.squareup.com/us/en/jobs?role%5B%5D=Software%20Engineering&type%5B%5D=Full-time";

const getData = async page => {
  // Extract data from job list
  const jobs = await page.evaluate(
    (company, logo) => {
      const elements = Array.from(
        document.querySelectorAll('div[data-job-role="Software Engineering"]')
      );
      return elements.map(e => {
        const title = e.querySelector("a").textContent;
        const location = e.querySelector("div:nth-child(3)").textContent;
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
