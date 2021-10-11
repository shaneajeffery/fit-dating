import express = require('express');
import graphql = require('express-graphql');
import mongoose = require('mongoose');
import graphqlSchema = require('./graphql/schema');

const app = express();

app.use(
  '/graphql',
  graphql.graphqlHTTP({
    schema: graphqlSchema.gatewaySchema,
    graphiql: true,
  })
);

const uri = 'mongodb://127.0.0.1/api';

mongoose
  .connect(uri)
  .then(() => app.listen(3000))
  .finally(() => console.log('Server is running...'))
  .catch((error) => {
    throw error;
  });
