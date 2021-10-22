const typeDef = `
  extend type Query {
    listEducationLevels: [EducationLevel!]!
    getEducationLevel(id: ID!): EducationLevel
  }

  extend type Mutation {
    createEducationLevel(name: String!): EducationLevel!
    updateEducationLevel(id: String!, name: String!): EducationLevel!
    deleteEducationLevel(id: String!): DeleteEducationLevel!
  }

  type DeleteEducationLevel {
    rowsDeleted: Int!
  }

  type EducationLevel {
    id: String!
    name: String!
  }
`;

module.exports = typeDef;
