const axios = require("axios");

const baseURL = "https://maps.googleapis.com/maps/api/geocode/json";
const KEY = process.env.GOOGLE_API_KEY;

module.exports = async (location) => {
  try {
    if (location.toLowerCase().includes("remote")) {
      return { address: "remote", coordinates: null };
    }

    const url = `${baseURL}?address=${location}&key=${KEY}`;
    const result = await axios.get(url);

    // If no geocoding results, return null
    if (result.data.status !== "OK") {
      return { address: "location not found", coordinates: null };
    }

    const coordinates = result.data.results[0].geometry.location;
    const address = formatAddress(result.data.results[0].address_components);

    return { address, coordinates };
  } catch (error) {
    return { address: "location not found", coordinates: null };
  }
};

const formatAddress = (components) => {
  let city, state, country;

  // Map over address components and extract formatted names
  components.forEach((component) => {
    component.types.forEach((type) => {
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
