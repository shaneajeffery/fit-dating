const { gql } = require('apollo-server');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { merge } = require('lodash');

const userSchema = require('./user/schema');
const userResolvers = require('./user/resolvers');

const query = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const resolvers = {};

const schema = makeExecutableSchema({
  typeDefs: [query, userSchema],
  resolvers: merge(resolvers, userResolvers),
});

module.exports = schema;
