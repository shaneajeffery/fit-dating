const typeDef = `
  extend type Query {
    listUsers: [User!]!
    getUser(id: ID!): User
    getUserByStytchId(phoneId: String!, userId: String!): User
  }

  extend type Mutation {
    requestPhoneVerificationCode(phoneNumber: String!): PhoneVerificationResponse!
    verifyPhoneVerificationCode(phoneId: String!, code: String!): Boolean
    createUserByPhone(phone: String!, stytchUserId: String!, stytchPhoneId: String!): User!
  }

  type User {
    id: String!
    firstName: String
    email: String
    phone: String
    dateOfBirth: String
    zipCode: String
    _gender: Gender
    _activities: [Activity!]
    _dietaryInterests: [DietaryInterest!]
    _ethnicities: [Ethnicity!]
    _languages: [Language!]
    createdAt: String!
    updatedAt: String!
    lastLogin: String
    stytchPhoneId: String!
    stytchUserId: String!
    finishedOnboarding: Boolean!
  }

  type PhoneVerificationResponse {
    phoneId: String!
    userId: String!
    userCreated: Boolean!
  }

  type PhoneVerificationCodeResponse {
    token: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;

module.exports = typeDef;
