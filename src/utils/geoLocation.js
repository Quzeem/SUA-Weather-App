const request = require('postman-request');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: '../config/config.env' });

const geoLocation = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}&limit=1`;

  request(url, { json: true }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (body.message) {
      callback('Location Not Found! ', undefined);
    } else {
      if (response.statusCode === 200) {
        callback(undefined, {
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name,
        });
      }
    }
  });
};

module.exports = geoLocation;
