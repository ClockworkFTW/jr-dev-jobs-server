const puppeteer = require("puppeteer");
const { waitHTML, getTech } = require("../util");
const { indeed, browserArgs } = require("../config");
const getCoordinates = require("./geocode");

module.exports = async (job) => {
  try {
    const browser = await puppeteer.launch({ args: browserArgs });
    const page = await browser.newPage();
    const url = `https://www.indeed.com/cmp/${job.company}/jobs?jk=${job.id}`;
    await page.goto(url, { timeout: 10000, waitUntil: "load" });
    await waitHTML(page);

    const description = await page.evaluate((indeed) => {
      const element = document.querySelector(indeed.description);

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

      return getDescription(element);
    }, indeed);

    browser.close();

    const technologies = getTech(description);

    const { address, coordinates } = await getCoordinates(job.location);

    return { ...job, description, technologies, address, coordinates };
  } catch (error) {
    return null;
  }
};
