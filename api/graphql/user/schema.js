const typeDef = `
  extend type Query {
    listUsers: [User!]!
    getUser(id: ID!): User
  }

  extend type Mutation {
    requestPhoneVerificationCode(phoneNumber: String!): PhoneVerificationResponse!
    verifyPhoneVerificationCode(phoneId: String!, code: String!): Boolean
    createUser(
      username: String!
      email: String!
      password: String!
      phone: String!
      dateOfBirth: String!
      zipCode: String!
      gender: String!
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
    _gender: Gender!
    _activities: [Activity!]
    _dietaryInterests: [DietaryInterest!]
    _ethnicities: [Ethnicity!]
    _languages: [Language!]
    createdAt: String!
    updatedAt: String!
  }

  type PhoneVerificationResponse {
    phoneId: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;

module.exports = typeDef;
