const typeDef = `
  extend type Query {
    getUserProfile(userId: String!): UserProfile
  }

  type UserProfile {
    userId: String!
    job: String!
    height: String!
    hometown: String!
    _religion: Religion!
    haveKids: String!
    wantKids: String!
    havePets: String!
    wantPets: String!
    createdAt: String!
    updatedAt: String!
  }
`;

module.exports = typeDef;
