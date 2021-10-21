const typeDef = `
  extend type Query {
    listActivities: [Activity!]!
    getActivity(id: ID!): Activity
  }

  extend type Mutation {
    createActivity(name: String!): Activity!
    updateActivity(id: String!, name: String!): Activity!
    deleteActivity(id: String!): DeleteActivity!
  }

  type DeleteActivity {
    rowsDeleted: Int!
  }

  type Activity {
    id: String!
    name: String!
  }
`;

module.exports = typeDef;
