const request = require('request');

var getWeather = (lat, lng, callback) => { //using coordinats to check weather
  request({
    url: `https://api.darksky.net/forecast/17da5f8110e0bd01862a894a04d73d56/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      })
    } else {
      callback('Unable to fetch weather.');
    }
  });
};

module.exports.getWeather = getWeather; //export module to other file
