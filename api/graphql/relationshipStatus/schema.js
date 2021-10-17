const typeDef = `
  extend type Query {
    listRelationshipStatuses: [RelationshipStatus!]!
    getRelationshipStatus(id: ID!): RelationshipStatus
  }

  type RelationshipStatus {
    id: String!
    name: String!
  }
`;

module.exports = typeDef;
