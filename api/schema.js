const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: String!
    username: String!
    email: String!
    password: String!
    phone: String!
    dateOfBirth: String!
    zipCode: String!
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
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
    ): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;

module.exports = typeDefs;
