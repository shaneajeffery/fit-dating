const { ApolloServer } = require('apollo-server');
const schema = require('./graphql/schema');
const models = require('./models');

// eslint-disable-next-line no-undef
const port = process.env.PORT || 9090;

const server = new ApolloServer({ schema, context: { models } });

server.listen({ port }, () =>
  console.log(`Server runs at: http://localhost:${port}`)
);
