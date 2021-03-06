const typeDef = `
  extend type Query {
    getUserProfile(userId: String!): UserProfile
  }

  extend type Mutation {
    createUserProfile(
      userId: String!
      job: String!
      height: String!
      hometown: String!
      religion: String!
      politicalView: String!
      relationshipStatus: String!
      educationLevel: String!
      haveKids: Boolean!
      wantKids: Boolean!
    ): UserProfile!
    updateUserProfile(
      userId: String!
      job: String
      height: String
      hometown: String
      religion: String
      politicalView: String
      relationshipStatus: String
      educationLevel: String
      haveKids: Boolean
      wantKids: Boolean
    ): UserProfile!
  }

  type UserProfile {
    userId: String!
    job: String!
    height: String!
    hometown: String!
    _religion: Religion
    _politicalView: PoliticalView
    _relationshipStatus: RelationshipStatus
    _educationLevel: EducationLevel
    haveKids: String!
    wantKids: String!
    havePets: String!
    wantPets: String!
    createdAt: String!
    updatedAt: String!
  }
`;

module.exports = typeDef;
