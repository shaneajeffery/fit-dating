const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    phone: String!
    dateOfBirth: String!
    zipCode: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    listUsers: [User!]!
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(
      username: String!
      email: String!
      password: String!
      phone: String!
      dateOfBirth: String!
      zipCode: String!
    ): User!
  }
`;

module.exports = typeDefs;
