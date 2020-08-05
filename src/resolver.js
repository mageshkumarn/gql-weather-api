const resolvers = {
    Query: {
        Weather: (__,{latitude, longitude},{dataSources}) =>{
            return dataSources.weatherData.getWeather({latitude,longitude})},
    },
    Weather:{
        Forecast:(Weather,{Trend = 'TODAY',sample = 'NEXT'})=>{
            switch(Trend){
                case 'TODAY':
                    return Weather.Today
                    break;
                case 'HOUR':
                    return Weather.Hour
                    break;
                case 'WEEK':
                    return Weather.Week
                    break;
                default:
                    return Weather.Today
                    break;
            }
        }
    }
};

module.exports = resolvers