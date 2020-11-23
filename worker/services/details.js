const puppeteer = require("puppeteer");
const { waitHTML, getTech } = require("../util");
const { indeed, browserArgs } = require("../config");
const getCoordinates = require("./geocode");

module.exports = async (job) => {
  try {
    const browser = await puppeteer.launch({ args: browserArgs });
    const page = await browser.newPage();
    const url = `https://www.indeed.com/cmp/${job.company}/jobs?jk=${job.link}&q=&l=&c=techsoftware&start=0`;
    await page.goto(url, { timeout: 10000, waitUntil: "load" });
    await waitHTML(page);

    const { link, description } = await page.evaluate((indeed) => {
      // Get job link
      let link = document.querySelector(indeed.link).getAttribute("href");
      link = `https://indeed.com${link}`;

      // Create HTML string of elements descendants
      const getDescription = (element) => {
        const arr = [];
        const allDescendants = (node) => {
          for (var i = 0; i < node.childNodes.length; i++) {
            var child = node.childNodes[i];
            if (child.nodeType === Node.ELEMENT_NODE) {
              arr.push(`<${child.nodeName.toLowerCase()}>`);
              allDescendants(child);
              arr.push(`</${child.nodeName.toLowerCase()}>`);
            } else {
              if (!/^\s*$/.test(child.textContent)) {
                arr.push(child.textContent.trim());
              }
            }
          }
        };
        allDescendants(element);
        return arr.join("");
      };

      // Get job description
      let description = document.querySelector(indeed.description);
      description = getDescription(description);

      return { link, description };
    }, indeed);

    browser.close();

    const technologies = getTech(description);

    const { address, coordinates } = await getCoordinates(job.location);

    return { ...job, link, description, technologies, address, coordinates };
  } catch (error) {
    return null;
  }
};
