const typeDef = `
  extend type Query {
    listRelationshipStatuses: [RelationshipStatus!]!
    getRelationshipStatus(id: ID!): RelationshipStatus
  }

  extend type Mutation {
    createRelationshipStatus(name: String!): RelationshipStatus!
    updateRelationshipStatus(id: String!, name: String!): RelationshipStatus!
    deleteRelationshipStatus(id: String!): DeleteRelationshipStatus!
  }

  type DeleteRelationshipStatus {
    rowsDeleted: Int!
  }

  type RelationshipStatus {
    id: String!
    name: String!
  }
`;

module.exports = typeDef;
