const weatherData = require('./weather_dataSrc/openWeatherMap')

const dataSource = ()=>({
    weatherData: new weatherData(),
    ApiKey:'e67e3fe1764476f98e30613abefe7dc7'
});

module.exports = dataSource
