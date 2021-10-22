const typeDef = `
  extend type Query {
    listUsers: [User!]!
    getUser(id: ID!): User
  }

  extend type Mutation {
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
`;

module.exports = typeDef;
