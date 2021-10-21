const typeDef = `
  extend type Query {
    listDietaryInterests: [DietaryInterest!]!
    getDietaryInterest(id: ID!): DietaryInterest
  }

  extend type Mutation {
    createDietaryInterest(name: String!): DietaryInterest!
    updateDietaryInterest(id: String!, name: String!): DietaryInterest!
    deleteDietaryInterest(id: String!): DeleteDietaryInterest!
  }

  type DeleteDietaryInterest {
    rowsDeleted: Int!
  }

  type DietaryInterest {
    id: String!
    name: String!
  }
`;

module.exports = typeDef;
