const typeDef = `
  extend type Query {
    listPoliticalViews: [PoliticalView!]!
    getPoliticalView(id: ID!): PoliticalView
  }

  extend type Mutation {
    createPoliticalView(name: String!): PoliticalView!
    updatePoliticalView(id: String!, name: String!): PoliticalView!
    deletePoliticalView(id: String!): DeletePoliticalView!
  }

  type DeletePoliticalView {
    rowsDeleted: Int!
  }

  type PoliticalView {
    id: String!
    name: String!
  }
`;

module.exports = typeDef;
