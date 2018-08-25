const yargs = require('yargs');
const axios = require('axios');
const saveFiles = require('./saveFiles.js');

const argv = yargs //simple menu for our user
  .options({
    a: {
      demand: true, //need to be write
      alias: 'address', //name
      describe: 'Address to fetch weather for',
      string: true //data type
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find address.');
  }

  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherURL = `https://api.darksky.net/forecast/17da5f8110e0bd01862a894a04d73d56/${lat},${lng}`;
  var currentLocation = response.data.results[0].formatted_address;
  console.log(currentLocation);
  return axios.get(weatherURL);
}).then((response, currentLocation) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`You are in ${currentLocation}. It's currently ${temperature} °F. It feels like ${apparentTemperature} °F`);
  console.log(`You are in ${currentLocation}. It's currently ${((temperature - 32) * 5 / 9).toFixed(2)} °C. It feels like ${((apparentTemperature - 32) * 5 / 9).toFixed(2)} °C`);
  var note = saveFiles.addNote(currentLocation, temperature);
  if (note) {
    console.log('Note created');
    saveFiles.logNote(note);
  } else {
    console.log('Note title taken');
  }
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers.');
  } else {
    console.log(e.message);
  }
});
//add save data, C temp, default location, more info etc
