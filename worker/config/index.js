const companies = [
  {
    company: "Apple",
    logo: "https://cdn.worldvectorlogo.com/logos/apple-black.svg",
  },
  {
    company: "Microsoft",
    logo: "https://cdn.worldvectorlogo.com/logos/microsoft-5.svg",
  },
  {
    company: "Google",
    logo: "https://cdn.worldvectorlogo.com/logos/google-icon.svg",
  },
  {
    company: "Amazon",
    logo: "https://cdn.worldvectorlogo.com/logos/amazon-icon-1.svg",
  },
  {
    company: "Netflix",
    logo: "https://cdn.worldvectorlogo.com/logos/netflix-1.svg",
  },
];

const indeed = {
  posting: "li.cmp-JobListItem",
  id: "data-tn-entityid",
  title: "div.cmp-JobListItem-title",
  location: "div.cmp-JobListItem-subtitle",
  time: "div.cmp-JobListItem-timeTag",
  link: "a.cmp-JobDetailStyledApplyButton",
  description: "div.cmp-JobDetailDescription-description",
};

const filters = [
  "director",
  "manager",
  "senior",
  "lead",
  "head",
  "internship",
  "intern",
  "university",
  "grad",
  "sr.",
  "principal",
  "staff",
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
];

module.exports = { companies, indeed, filters, technologies };
