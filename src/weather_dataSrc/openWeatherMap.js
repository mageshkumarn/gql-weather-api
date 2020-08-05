const { RESTDataSource }  = require('apollo-datasource-rest');

class weatherData extends RESTDataSource{
    constructor(){
       super();
       this.baseURL = "https://api.openweathermap.org/data/2.5/";
    }

    willSendRequest(request) {
        if(this.context.ApiKey && this.context.ApiKey!=='')
            request.params.set('appid', this.context.ApiKey);
        else
            request.params.set('appid', this.context.dataSources.ApiKey);
    }

    currentWeatherMap(data){
        return [{
            Temperature: data.current.temp,
            Humidity: data.current.humidity,
            Pressure: data.current.pressure,
            Description: `${data.current.weather[0].description}`,
            Sunrise: `${new Date(new Date(0).setUTCSeconds(data.current.sunrise)).toUTCString()}`,
            Sunset: `${new Date(new Date(0).setUTCSeconds(data.current.sunset)).toUTCString()}`,
        }];
    }

    hourlyWeatherMap(data){
        const response = [];
        for(let i=0;i<data.hourly.length;i++){
            let obj = {
                Temperature: data.hourly[i].temp,
                Humidity: data.hourly[i].humidity,
                Pressure: data.hourly[i].pressure,
                Description: `${data.hourly[i].weather[0].description}`,
                Sunrise: ``,
                Sunset: ``,
            };
            response.push(obj);
        }
        return response;
    }

    dailyWeatherMap(data){
        const response = [];
        for(let i=0;i<data.daily.length;i++){
            let obj = {
                Temperature: data.daily[i].temp.max,
                Humidity: data.daily[i].humidity,
                Pressure: data.daily[i].pressure,
                Description: `${data.daily[i].weather[0].description}`,
                Sunrise: `${new Date(new Date(0).setUTCSeconds(data.daily[i].sunrise)).toUTCString()}`,
                Sunset: `${new Date(new Date(0).setUTCSeconds(data.daily[i].sunset)).toUTCString()}`,
            };
            response.push(obj);
        }
        return response;
    }

    async getWeather({latitude,longitude}){
        const response = await this.get(`onecall?lat=${latitude}&lon=${longitude}`);
        return {
            Timezone: `${response.timezone}`,
            Today: this.currentWeatherMap(response),
            Hour: this.hourlyWeatherMap(response),
            Week: this.dailyWeatherMap(response)};
    }
}

module.exports = weatherData