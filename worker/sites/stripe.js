const company = "Stripe";
const logo = "https://cdn.worldvectorlogo.com/logos/stripe-4.svg";
const url = "https://stripe.com/jobs/search?t=engineering&s=fulltime";

const getData = async page => {
  // Extract data from job list
  const jobs = await page.evaluate(
    (company, logo) => {
      const elements = Array.from(document.querySelectorAll("li.sc-EHOje"));
      return elements.map(e => {
        const title = e.querySelector("a > div").textContent;
        const location = e.querySelector("div.sc-ifAKCX > span").textContent;
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
