const company = "Lyft";
const logo = "https://cdn.worldvectorlogo.com/logos/lyft-logo.svg";
const url = "https://www.lyft.com/careers";

const getData = async page => {
  // Expand engineer job list
  const button = await page.$x(
    "/html/body/div[3]/div/article/span/section[5]/div[2]/div/div[2]/div[30]/button"
  );
  await button[0].evaluate(button => button.click());

  // Extract data from job list
  const jobs = await page.evaluate(
    (company, logo) => {
      const elements = Array.from(document.querySelectorAll("a._1HcI2i"));
      return elements.map(e => {
        const title = e.querySelector("h3").textContent;
        const location = e.querySelector("p").textContent;
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
