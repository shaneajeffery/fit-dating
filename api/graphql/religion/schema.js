const typeDef = `
  extend type Query {
    listReligions: [Religion!]!
    getReligion(id: ID!): Religion
  }

  extend type Mutation {
    createReligion(name: String!): Religion!
    updateReligion(id: String!, name: String!): Religion!
    deleteReligion(id: String!): DeleteReligion!
  }

  type DeleteReligion {
    rowsDeleted: Int!
  }

  type Religion {
    id: String!
    name: String!
  }
`;

module.exports = typeDef;
