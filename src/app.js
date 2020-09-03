// Core modules
const path = require('path');

// External modules
const express = require('express');
const hbs = require('hbs');

// Custom modules
const geoLocation = require('./utils/geoLocation');
const weatherForecast = require('./utils/weatherForecast');

// Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views directory
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory
app.use(express.static(publicDirectoryPath))


// ROUTES
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Quzeem Agbaje',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Quzeem Agbaje',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text.',
    title: 'Help',
    name: 'Quzeem Agbaje',
  });
});

app.get('/weather', (req, res) => {
  const { address } = req.query;
  if(!address) {
    return res.send({
      Error: 'You must provide an valid address'
    })
  }
  geoLocation(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    //else
    weatherForecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      // if both request succeed
      res.send({
        forecast: forecastData,
        location,
        address
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Quzeem Agbaje',
    errorMessage: 'Help article not found.',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Quzeem Agbaje',
    errorMessage: 'Page not found!',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})