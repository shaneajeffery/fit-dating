const typeDef = `
  extend type Query {
    getUserMessages(userId: String!): [UserMessage!]
  }

  extend type Mutation {
    createUserMessage(
      toUserId: String!
      fromUserId: String!
      message: String!
    ): UserMessage!
    updateMessageReadAt(
      messageId: String!
    ): UserMessage!
  }

  type UserMessage {
    toUserId: String!
    fromUserId: String!
    messageId: String!
    message: String!
    messageReadAt: String
    createdAt: String!
    updatedAt: String!
  }
`;

module.exports = typeDef;
