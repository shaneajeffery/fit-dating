const typeDef = `
  extend type Query {
    listEthnicities: [Ethnicity!]!
    getEthnicity(id: ID!): Ethnicity
  }

  extend type Mutation {
    createEthnicity(name: String!): Ethnicity!
    updateEthnicity(id: String!, name: String!): Ethnicity!
    deleteEthnicity(id: String!): DeleteEthnicity!
  }

  type DeleteEthnicity {
    rowsDeleted: Int!
  }

  type Ethnicity {
    id: String!
    name: String!
  }
`;

module.exports = typeDef;
