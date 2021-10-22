const typeDef = `
  extend type Query {
    listLanguages: [Language!]!
    getLanguage(id: ID!): Language
  }

  extend type Mutation {
    createLanguage(name: String!): Language!
    updateLanguage(id: String!, name: String!): Language!
    deleteLanguage(id: String!): DeleteLanguage!
  }

  type DeleteLanguage {
    rowsDeleted: Int!
  }

  type Language {
    id: String!
    name: String!
  }
`;

module.exports = typeDef;
