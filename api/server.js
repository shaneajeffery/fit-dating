const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const models = require('./models');

// eslint-disable-next-line no-undef
const port = process.env.PORT || 9090;

const server = new ApolloServer({ resolvers, typeDefs, context: { models } });

server.listen({ port }, () =>
  console.log(`Server runs at: http://localhost:${port}`)
);
