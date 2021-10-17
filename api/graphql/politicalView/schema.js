const typeDef = `
  extend type Query {
    listPoliticalViews: [PoliticalView!]!
    getPoliticalView(id: ID!): PoliticalView
  }

  type PoliticalView {
    id: String!
    name: String!
  }
`;

module.exports = typeDef;
