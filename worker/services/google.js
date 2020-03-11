const axios = require("axios");

const baseURL = "https://maps.googleapis.com/maps/api/geocode/json";
const KEY = process.env.GOOGLE_API_KEY;

const geocode = async job => {
  const result = await axios.get(
    `${baseURL}?address=${job.location}&key=${KEY}`
  );
  if (
    result.data.status !== "OK" ||
    job.location.toLowerCase().includes("remote")
  ) {
    return { ...job, location: "remote", coords: null };
  } else {
    return { ...job, coords: result.data.results[0].geometry.location };
  }
};

const Bottleneck = require("bottleneck");

const limiter = new Bottleneck({
  minTime: 50
});

const getCoords = limiter.wrap(geocode);

module.exports = getCoords;
