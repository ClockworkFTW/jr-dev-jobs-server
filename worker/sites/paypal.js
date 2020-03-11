const company = "PayPal";
const logo = "https://cdn.worldvectorlogo.com/logos/paypal-icon.svg";
const url =
  "https://jobsearch.paypal-corp.com/en-US/search?facetcategory=data%20scientist%7Cdesign%20engineer%7Cglobal%20technical%20support%20engin%7Clocalization%7Crelease%20engineer%7Cresearch%20scientist%7Csoftware%20development%7Cuser%20experience%20researcher&facetcompany=paypal&facetcountry=us";

const getData = async page => {
  // Extract data from job list
  const jobs = await page.evaluate(
    (company, logo) => {
      const elements = Array.from(document.querySelectorAll("tr.job-result"));
      return elements.map(e => {
        const title = e.querySelector("a.job-result-title").textContent;
        const location = e.querySelector("div.job-location-line").textContent;
        const link = e.querySelector("a.job-result-title").getAttribute("href");
        return { company, title, location, logo, link };
      });
    },
    company,
    logo
  );

  return jobs;
};

module.exports = { company, url, getData };
