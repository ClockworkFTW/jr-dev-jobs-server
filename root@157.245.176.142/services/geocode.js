const axios = require("axios");

const baseURL = "https://maps.googleapis.com/maps/api/geocode/json";
const KEY = process.env.GOOGLE_API_KEY;

const geocode = async job => {
  // If job is remote, return null and skip geocoding
  if (job.location.toLowerCase().includes("remote")) {
    return { ...job, location: "remote", coords: null };
  }
  // Else, attempt to fetch location coordinates
  else {
    const result = await axios.get(
      `${baseURL}?address=${job.location}&key=${KEY}`
    );
    // If no geocoding results, return null
    if (result.data.status !== "OK") {
      return { ...job, location: "location not found", coords: null };
    }
    // Else, return coords and formatted address
    else {
      const coords = result.data.results[0].geometry.location;
      const location = formatAddress(result.data.results[0].address_components);
      return { ...job, location, coords };
    }
  }
};

// Normalize location format
const formatAddress = components => {
  let city, state, country;

  // Map over address components and extract
  components.forEach(component => {
    component.types.forEach(type => {
      switch (type) {
        case "locality":
          city = component.long_name;
          break;
        case "administrative_area_level_1":
          state = component.short_name;
          break;
        case "country":
          country = component.short_name;
        default:
          break;
      }
    });
  });

  // Filter any blank values
  return [city, state, country].filter(Boolean).join(", ");
};

// Throttle requests to avoid rate limits
const Bottleneck = require("bottleneck");

const limiter = new Bottleneck({
  minTime: 50
});

const getCoords = limiter.wrap(geocode);

module.exports = getCoords;
