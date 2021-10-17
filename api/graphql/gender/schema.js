const typeDef = `
  extend type Query {
    listGenders: [Gender!]!
    getGender(id: ID!): Gender
  }

  type Gender {
    id: String!
    name: String!
  }
`;

module.exports = typeDef;
