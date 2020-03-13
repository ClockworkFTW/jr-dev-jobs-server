const airbnb = require("./airbnb");
const dropbox = require("./dropbox");
const ebay = require("./ebay");
const github = require("./github");
const lyft = require("./lyft");
const paypal = require("./paypal");
const pinterest = require("./pinterest");
const robinhood = require("./robinhood");
const square = require("./square");
const stripe = require("./stripe");
const vmware = require("./vmware");

module.exports = [
  dropbox,
  ebay,
  github,
  lyft,
  paypal,
  pinterest,
  robinhood,
  square,
  stripe,
  vmware
];

// // Test individual sites
// module.exports = [dropbox, stripe];
