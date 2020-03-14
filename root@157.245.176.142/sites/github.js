const company = "GitHub";
const logo = "https://cdn.worldvectorlogo.com/logos/github-1.svg";
const url = "https://github.com/about/careers";

const getData = async page => {
  // Select engineer job list
  const button = await page.$x(
    "/html/body/div[4]/main/div[2]/div/div[3]/div[6]/div/button"
  );
  await button[0].evaluate(button => button.click());

  // Extract data from job list
  const jobs = await page.evaluate(
    (company, logo) => {
      const elements = Array.from(
        document.querySelector("div.Details--on").querySelectorAll("a")
      );
      return elements.map(e => {
        const title = e.querySelector("span").textContent;
        const location = e.querySelector("span.d-block").textContent;
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
