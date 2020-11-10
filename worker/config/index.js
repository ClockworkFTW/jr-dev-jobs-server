const airbnb = require("../sites/airbnb");
const dropbox = require("../sites/dropbox");
const ebay = require("../sites/ebay");
const github = require("../sites/github");
const lyft = require("../sites/lyft");
const paypal = require("../sites/paypal");
const pinterest = require("../sites/pinterest");
const robinhood = require("../sites/robinhood");
const square = require("../sites/square");
const stripe = require("../sites/stripe");
const vmware = require("../sites/vmware");

const companies = [
  {
    company: "Airbnb",
    logo: "https://cdn.worldvectorlogo.com/logos/airbnb-1.svg",
    link: "https://careers.airbnb.com/positions/",
    listingSelector: "div.page-positions__overview",
    getJobs: airbnb,
  },
  {
    company: "Dropbox",
    logo: "https://cdn.worldvectorlogo.com/logos/dropbox-1.svg",
    link: "https://www.dropbox.com/jobs/teams/engineering",
    listingSelector: "div.jc03-content",
    getJobs: dropbox,
  },
  {
    company: "eBay",
    logo: "https://cdn.worldvectorlogo.com/logos/ebay.svg",
    link: "https://jobs.ebayinc.com/search-jobs?ac:38628",
    listingSelector: "div.ats-description",
    getJobs: ebay,
  },
  {
    company: "GitHub",
    logo: "https://cdn.worldvectorlogo.com/logos/github-1.svg",
    link: "https://github.com/about/careers",
    listingSelector: "div#content",
    getJobs: github,
  },
  {
    company: "Lyft",
    logo: "https://cdn.worldvectorlogo.com/logos/lyft-logo.svg",
    link: "https://www.lyft.com/careers",
    listingSelector: "div#content",
    getJobs: lyft,
  },
  {
    company: "PayPal",
    logo: "https://cdn.worldvectorlogo.com/logos/paypal-icon.svg",
    link:
      "https://jobsearch.paypal-corp.com/en-US/search?facetcategory=data%20scientist%7Cdesign%20engineer%7Cglobal%20technical%20support%20engin%7Clocalization%7Crelease%20engineer%7Cresearch%20scientist%7Csoftware%20development%7Cuser%20experience%20researcher&facetcompany=paypal&facetcountry=us",
    listingSelector: "div.jdp-job-description-card content-card",
    getJobs: paypal,
  },
  {
    company: "Pinterest",
    logo: "https://cdn.worldvectorlogo.com/logos/pinterest-1.svg",
    link:
      "https://www.pinterestcareers.com/jobs/search?page=1&department_uids%5B%5D=70a034e7e24e66ce7ab45e19a7cd484d&query=",
    listingSelector: "div#job_description_2_0",
    getJobs: pinterest,
  },
  {
    company: "Robinhood",
    logo: "https://cdn.worldvectorlogo.com/logos/robinhood-1.svg",
    link:
      "https://boards.greenhouse.io/embed/job_board?for=robinhood&b=https%3A%2F%2Fcareers.robinhood.com%2Fopenings",
    listingSelector: "div#content",
    getJobs: robinhood,
  },
  {
    company: "Square",
    logo: "https://cdn.worldvectorlogo.com/logos/square.svg",
    link:
      "https://careers.squareup.com/us/en/jobs?role%5B%5D=Software%20Engineering&type%5B%5D=Full-time",
    listingSelector: "div[itemprop='description']",
    getJobs: square,
  },
  // {
  //   company: "Stripe",
  //   logo: "https://cdn.worldvectorlogo.com/logos/stripe-4.svg",
  //   link: "https://stripe.com/jobs/search?t=engineering&s=fulltime",
  //   listingSelector: "div.Jobs-DetailsDescription__content",
  //   getJobs: stripe,
  // },
  {
    company: "VMware",
    logo: "https://cdn.worldvectorlogo.com/logos/vmware-1.svg",
    link:
      "https://careers.vmware.com/main/jobs?page=1&limit=100&experienceLevels=Entry%20Level&tags1=Engineering%20and%20Technology&country=USA",
    listingSelector: "article#description-body",
    getJobs: vmware,
  },
];

module.exports = companies;
