const typeDef = `
  extend type Query {
    listReligions: [Religion!]!
    getReligion(id: ID!): Religion
  }

  type Religion {
    id: String!
    name: String!
  }
`;

module.exports = typeDef;
