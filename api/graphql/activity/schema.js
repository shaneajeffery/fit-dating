const typeDef = `
  extend type Query {
    listActivities: [Activity!]!
    getActivity(id: ID!): Activity
  }

  type Activity {
    id: String!
    name: String!
  }
`;

module.exports = typeDef;
