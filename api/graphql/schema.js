const { gql } = require('apollo-server');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { merge } = require('lodash');

const activitySchema = require('./activity/schema');
const activityResolvers = require('./activity/resolvers');
const dietaryInterestSchema = require('./dietaryInterest/schema');
const dietaryInterestResolvers = require('./dietaryInterest/resolvers');
const educationLevelSchema = require('./educationLevel/schema');
const educationLevelResolvers = require('./educationLevel/resolvers');
const ethnicitySchema = require('./ethnicity/schema');
const ethnicityResolvers = require('./ethnicity/resolvers');
const genderSchema = require('./gender/schema');
const genderResolvers = require('./gender/resolvers');
const languageSchema = require('./language/schema');
const languageResolvers = require('./language/resolvers');
const politicalViewSchema = require('./politicalView/schema');
const politicalViewResolvers = require('./politicalView/resolvers');
const relationshipStatusSchema = require('./relationshipStatus/schema');
const relationshipStatusResolvers = require('./relationshipStatus/resolvers');
const religionSchema = require('./religion/schema');
const religionResolvers = require('./religion/resolvers');
const userSchema = require('./user/schema');
const userResolvers = require('./user/resolvers');
const userProfileSchema = require('./userProfile/schema');
const userProfileResolvers = require('./userProfile/resolvers');
const userMessageSchema = require('./userMessage/schema');
const userMessageResolvers = require('./userMessage/resolvers');

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
    activitySchema,
    dietaryInterestSchema,
    educationLevelSchema,
    ethnicitySchema,
    genderSchema,
    languageSchema,
    politicalViewSchema,
    relationshipStatusSchema,
    religionSchema,
    userSchema,
    userProfileSchema,
    userMessageSchema,
  ],
  resolvers: merge(
    resolvers,
    activityResolvers,
    dietaryInterestResolvers,
    educationLevelResolvers,
    ethnicityResolvers,
    genderResolvers,
    languageResolvers,
    politicalViewResolvers,
    relationshipStatusResolvers,
    religionResolvers,
    userResolvers,
    userProfileResolvers,
    userMessageResolvers
  ),
});

module.exports = schema;
