const puppeteer = require("puppeteer");

module.exports = async (job) => {
  try {
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.goto(job.link);

    const listing = await page.evaluate((selector) => {
      const element = document.querySelector(selector);

      const getHTML = (element) => {
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

      return getHTML(element);
    }, job.listingSelector);

    browser.close();

    return { ...job, listing };
  } catch (error) {
    return { ...job, listing: null };
  }
};
