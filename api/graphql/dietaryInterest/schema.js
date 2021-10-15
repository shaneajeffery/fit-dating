const typeDef = `
  extend type Query {
    listDietaryInterests: [DietaryInterest!]!
    getDietaryInterest(id: ID!): DietaryInterest
  }

  type DietaryInterest {
    id: String!
    name: String!
  }
`;

module.exports = typeDef;
