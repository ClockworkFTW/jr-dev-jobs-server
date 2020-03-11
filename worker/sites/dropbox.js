const company = "Dropbox";
const logo = "https://cdn.worldvectorlogo.com/logos/dropbox-1.svg";
const url = "https://www.dropbox.com/jobs/teams/engineering";

const getData = async page => {
  // Extract data from job list
  const jobs = await page.evaluate(
    (company, logo) => {
      const elements = Array.from(
        document.querySelectorAll("li.open-positions__listing")
      );

      return elements.map(e => {
        const title = e.querySelector("h5.open-positions__listing-title")
          .textContent;
        const location = e.querySelector("p.open-positions__listing-location")
          .textContent;
        const link = `https://www.dropbox.com${e
          .querySelector("a.open-positions__listing-link")
          .getAttribute("href")}`;
        return { company, title, location, logo, link };
      });
    },
    company,
    logo
  );

  return jobs;
};

module.exports = { company, url, getData };
