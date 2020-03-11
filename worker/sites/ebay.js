const company = "eBay";
const logo = "https://cdn.worldvectorlogo.com/logos/ebay.svg";
const url = "https://jobs.ebayinc.com/search-jobs?ac=38628";

const getData = async page => {
  // Extract data from job list
  const jobs = await page.evaluate(
    (company, logo) => {
      const elements = Array.from(document.querySelectorAll("a[data-job-id]"));
      return elements.map(e => {
        const title = e.querySelector("h2").textContent;
        const location = e.querySelector("span").textContent;
        const link = e.getAttribute("href");
        return { company, title, location, logo, link };
      });
    },
    company,
    logo
  );

  return jobs;
};

module.exports = { company, url, getData };
