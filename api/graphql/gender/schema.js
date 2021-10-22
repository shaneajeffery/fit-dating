const typeDef = `
  extend type Query {
    listGenders: [Gender!]!
    getGender(id: ID!): Gender
  }

  extend type Mutation {
    createGender(name: String!): Gender!
    updateGender(id: String!, name: String!): Gender!
    deleteGender(id: String!): DeleteGender!
  }

  type DeleteGender {
    rowsDeleted: Int!
  }

  type Gender {
    id: String!
    name: String!
  }
`;

module.exports = typeDef;
