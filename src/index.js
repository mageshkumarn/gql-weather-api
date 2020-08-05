const { ApolloServer } = require('apollo-server');
const { Schema } = require('./schema')
const resolvers = require('./resolver')
const dataSource  = require('./dataSource')

const server = new ApolloServer({typeDefs:Schema,resolvers,
    dataSources:dataSource,
    /*
    * To Read data from headers, we need to define the context property and an async function
    * in which req is the property holding the incoming request properties. 
    * With .headers. property we can access all the properties defined in headers.
    * 
    * Please note that, all properties defined in headers will follow small case only.
    * Even if we define a key with camelCase or upper case, incoming headers property will hold only
    * smaller case keys.
    * 
    * With header defined below, req.headers.apikey will hold the value: "DummyValue" irrespective of
    * the incoming property key's case
    *   {
            "apiKey":"DummyValue"
        }
    */
    context:async({req})=>{
        const ApiKey = req.headers.apikey || '';
        return {ApiKey:ApiKey,SampleKey:12345};
    }
 });

server.listen().then(({url})=>{
    console.log(`Server is ready: ${url}`);
});
