/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-useless-catch */
import gtSchema = require('@graphql-tools/schema');
import User = require('../../models/user');

const usersSchema = gtSchema.makeExecutableSchema({
  typeDefs: `
    type User {
      _id: ID!
      username: String!
      email: String!

    }

    type Query {
      listUsers(): [User!]
    }
  `,

  resolvers: {
    users: async () => {
      try {
        return await 
      } catch (error) {
        throw error;
      }
    },
  },
});

export default usersSchema;


