const express = require("express");
const app = express();
const port = 3005;

const redis = require("redis");
const client = redis.createClient();
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);

const cors = require("cors");
app.use(cors());

app.get("/jobs", async (req, res) => {
  let jobs = await getAsync("jobs");
  jobs = JSON.parse(jobs);
  res.status(200).json(jobs);
});

app.listen(port, () => console.log(`jobs api running on port: ${port}`));
