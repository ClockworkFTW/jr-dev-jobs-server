const browserArgs = ["--no-sandbox"];

const indeed = {
  count: "h2.cmp-JobListJobCount-jobCount",
  posting: "li.cmp-JobListItem",
  id: "data-tn-entityid",
  title: "div.cmp-JobListItem-title",
  location: "div.cmp-JobListItem-subtitle",
  time: "div.cmp-JobListItem-timeTag",
  link: "a.cmp-JobDetailStyledApplyButton",
  description: "div.cmp-JobDetailDescription-description",
  overallReview: "g.cmp-RatingsGraphMarkerText-highlight > text",
  reviews: "div.css-1h13g5j",
  reviewRating: "span.css-3xwreb",
  reviewCategory: "span.css-1x3684k",
};

const companies = [
  {
    company: "Adobe",
    logo: "https://cdn.worldvectorlogo.com/logos/adobe-2.svg",
  },
  {
    company: "Airbnb",
    logo: "https://cdn.worldvectorlogo.com/logos/airbnb-1.svg",
  },
  {
    company: "Amazon",
    logo: "https://cdn.worldvectorlogo.com/logos/amazon-icon-1.svg",
  },
  {
    company: "AMD",
    logo: "https://cdn.worldvectorlogo.com/logos/amd-logo-1.svg",
  },
  {
    company: "Apple",
    logo: "https://cdn.worldvectorlogo.com/logos/apple-black.svg",
  },
  {
    company: "Cisco",
    logo: "https://cdn.worldvectorlogo.com/logos/cisco-2.svg",
  },
  {
    company: "Comcast",
    logo: "https://cdn.worldvectorlogo.com/logos/comcast.svg",
  },
  {
    company: "Dell",
    logo: "https://cdn.worldvectorlogo.com/logos/dell-2.svg",
  },
  {
    company: "Dropbox",
    logo: "https://cdn.worldvectorlogo.com/logos/dropbox-1.svg",
  },
  {
    company: "DoorDash",
    logo: "https://cdn.worldvectorlogo.com/logos/doordash-logo.svg",
  },
  {
    company: "eBay",
    logo: "https://cdn.worldvectorlogo.com/logos/ebay.svg",
  },
  {
    company: "IBM",
    logo: "https://cdn.worldvectorlogo.com/logos/ibm.svg",
  },
  {
    company: "Instacart",
    logo: "https://cdn.worldvectorlogo.com/logos/instacart-1.svg",
  },
  {
    company: "Intel",
    logo: "https://cdn.worldvectorlogo.com/logos/intel.svg",
  },
  {
    company: "Microsoft",
    logo: "https://cdn.worldvectorlogo.com/logos/microsoft-5.svg",
  },
  {
    company: "Oracle",
    logo: "https://cdn.worldvectorlogo.com/logos/oracle-logo-1.svg",
  },
  {
    company: "Pinterest",
    logo: "https://cdn.worldvectorlogo.com/logos/pinterest-1.svg",
  },
  {
    company: "Postmates",
    logo: "https://cdn.worldvectorlogo.com/logos/postmates-1.svg",
  },
  {
    company: "Google",
    logo: "https://cdn.worldvectorlogo.com/logos/google-icon.svg",
  },
  {
    company: "Lyft",
    logo: "https://cdn.worldvectorlogo.com/logos/lyft-logo.svg",
  },
  {
    company: "Netflix",
    logo: "https://cdn.worldvectorlogo.com/logos/netflix-1.svg",
  },
  {
    company: "Nvidia",
    logo: "https://cdn.worldvectorlogo.com/logos/nvidia.svg",
  },
  {
    company: "Reddit",
    logo: "https://cdn.worldvectorlogo.com/logos/reddit-1.svg",
  },
  {
    company: "Salesforce",
    logo: "https://cdn.worldvectorlogo.com/logos/salesforce-2.svg",
  },
  {
    company: "SAP",
    logo: "https://cdn.worldvectorlogo.com/logos/sap-2011-logo.svg",
  },
  {
    company: "Square",
    logo: "https://cdn.worldvectorlogo.com/logos/square.svg",
  },
  {
    company: "Tesla",
    logo: "https://cdn.worldvectorlogo.com/logos/tesla-motors.svg",
  },
  {
    company: "Twitch",
    logo: "https://cdn.worldvectorlogo.com/logos/twitch-purple.svg",
  },
  {
    company: "Twitter",
    logo: "https://cdn.worldvectorlogo.com/logos/twitter.svg",
  },
];

const filters = [
  "director",
  "chief",
  "manager",
  "senior",
  "sr.",
  "lead",
  "head",
  "principal",
  "staff",
  "architect",
];

const technologies = [
  "JavaScript",
  "HTML",
  "CSS",
  "SQL",
  "React",
  "Redux",
  "TypeScript",
  "Python",
  "Objective-C",
  "Swift",
  "C#",
  "MySQL",
  "Java",
  "Cassandra",
  "Perl",
  "Shell",
  "JQuery",
  "LESS",
  "SASS",
  "Node",
  "Express",
  "PHP",
  "Laravel",
  "Django",
  "Flask",
  "Dupral",
  "Bootstrap",
  "ASP.net",
  "Ruby",
  "Go",
  "API",
  "JSON",
  "Rails",
  "AWS",
  "Ember",
  "ES6",
  "Kubernetes",
  "Docker",
  "Wordpress",
  "Joomla",
  "Magento",
  ".NET",
  "Azure",
  "Jenkins",
  "REST",
];

module.exports = { browserArgs, indeed, companies, filters, technologies };
