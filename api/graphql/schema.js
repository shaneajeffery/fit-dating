const { gql } = require('apollo-server');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { merge } = require('lodash');

const userSchema = require('./user/schema');
const userResolvers = require('./user/resolvers');
const activitySchema = require('./activity/schema');
const activityResolvers = require('./activity/resolvers');
const dietaryInterestSchema = require('./dietaryInterest/schema');
const dietaryInterestResolvers = require('./dietaryInterest/resolvers');

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
  typeDefs: [query, userSchema, activitySchema, dietaryInterestSchema],
  resolvers: merge(
    resolvers,
    userResolvers,
    activityResolvers,
    dietaryInterestResolvers
  ),
});

module.exports = schema;
