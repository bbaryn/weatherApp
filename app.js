const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

//function which display results
geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address);
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`It's currently ${weatherResults.temperature} °F. It feels like ${weatherResults.apparentTemperature} °F`);
      }
    });
  }
});
