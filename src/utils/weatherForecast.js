const request = require('postman-request');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: '../config/config.env' });

const weatherForecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${
    process.env.WEATHERSTACK_ACCESS_KEY
  }&query=${encodeURIComponent(latitude)},${encodeURIComponent(
    longitude
  )}&units=f`;

  request(url, { json: true }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location. Try another search', undefined);
    } else {
      if (response.statusCode === 200) {
        callback(
          undefined,
          `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. The humidity is ${body.current.humidity}%`
        );
      }
    }
  });
};

module.exports = weatherForecast;
