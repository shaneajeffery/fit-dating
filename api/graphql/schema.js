const { gql } = require('apollo-server');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { merge } = require('lodash');

const userSchema = require('./user/schema');
const userResolvers = require('./user/resolvers');
const activitySchema = require('./activity/schema');
const activityResolvers = require('./activity/resolvers');
const dietaryInterestSchema = require('./dietaryInterest/schema');
const dietaryInterestResolvers = require('./dietaryInterest/resolvers');
const educationLevelSchema = require('./educationLevel/schema');
const educationLevelResolvers = require('./educationLevel/resolvers');
const genderSchema = require('./gender/schema');
const genderResolvers = require('./gender/resolvers');
const politicalViewSchema = require('./politicalView/schema');
const politicalViewResolvers = require('./politicalView/resolvers');
const relationshipStatusSchema = require('./relationshipStatus/schema');
const relationshipStatusResolvers = require('./relationshipStatus/resolvers');
const religionSchema = require('./religion/schema');
const religionResolvers = require('./religion/resolvers');

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
  typeDefs: [
    query,
    userSchema,
    activitySchema,
    dietaryInterestSchema,
    educationLevelSchema,
    genderSchema,
    politicalViewSchema,
    relationshipStatusSchema,
    religionSchema,
  ],
  resolvers: merge(
    resolvers,
    userResolvers,
    activityResolvers,
    dietaryInterestResolvers,
    educationLevelResolvers,
    genderResolvers,
    politicalViewResolvers,
    relationshipStatusResolvers,
    religionResolvers
  ),
});

module.exports = schema;
