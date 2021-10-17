const typeDef = `
  extend type Query {
    listEducationLevels: [EducationLevel!]!
    getEducationLevel(id: ID!): EducationLevel
  }

  type EducationLevel {
    id: String!
    name: String!
  }
`;

module.exports = typeDef;
