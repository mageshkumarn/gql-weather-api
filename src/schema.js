const { gql } = require('apollo-server');

const typeDef = gql`
## Query to be fetched from GraphQL
type Query{
    Weather(latitude:Float! , longitude: Float! ): Weather!
}

## Definition of Weather
type Weather{
    Timezone: String!
    Forecast(Trend:WeatherTrend): [Forecast]!
}

## Definition of Forecase
type Forecast{
    Temperature: Float!
    Humidity: Float!
    Pressure: Float!
    Description: String
    Sunrise: String!
    Sunset: String!
}

enum WeatherTrend{
    TODAY,
    HOUR,
    WEEK
}
`;

module.exports.Schema = typeDef