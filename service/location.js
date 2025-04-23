const axios = require('axios');
const dotenv = require("dotenv").config();


const getLocationName = async(latitude, longitude) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  try{
    const response = await axios.get(url);
    const results = response.data.results;

    if(results && results.length > 0){
      const location = results[0].formatted_address;
      // console.log("Reversed corordinates: ", location);
      return location;
    }else{
      return "Location not found";
    }
  }catch(error){
    console.error("Geocoding error", error.message);
    return "Geocoding failed";
  }
};

module.exports = getLocationName;