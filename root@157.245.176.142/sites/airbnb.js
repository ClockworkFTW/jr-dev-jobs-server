const company = "Airbnb";
const logo = "https://cdn.worldvectorlogo.com/logos/airbnb-1.svg";
const url = "https://careers.airbnb.com/positions/";

const getData = async page => {
  // Select engineer job list
  const button = await page.$x(
    "/html/body/div[2]/div/main/div[2]/div/div/div[2]/div[1]/div/ul/li[8]/button"
  );
  await button[0].evaluate(button => button.click());

  // Extract data from job list
  const jobs = await page.evaluate(
    (company, logo) => {
      const elements = Array.from(
        document.querySelectorAll("li.jobs-board__positions__list__item")
      );
      return elements.map(e => {
        const title = e.querySelector("h3").textContent;
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
