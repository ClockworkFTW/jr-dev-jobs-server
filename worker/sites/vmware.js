const company = "VMware";
const logo = "https://cdn.worldvectorlogo.com/logos/vmware-1.svg";
const url =
  "https://careers.vmware.com/main/jobs?page=1&limit=100&experienceLevels=Entry%20Level&tags1=Engineering%20and%20Technology&country=USA";

const getData = async page => {
  // Extract data from job list
  const jobs = await page.evaluate(
    (company, logo) => {
      const elements = Array.from(
        document.querySelectorAll("span.mat-content")
      );
      return elements.map(e => {
        const title = e.querySelector("a.job-title-link").textContent;
        const location = e
          .querySelector("span.location")
          .querySelectorAll("span")[1].textContent;
        const link = e.querySelector("a.job-title-link").getAttribute("href");
        return { company, title, location, logo, link };
      });
    },
    company,
    logo
  );

  return jobs;
};

module.exports = { company, url, getData };
