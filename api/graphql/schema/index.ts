/* eslint-disable @typescript-eslint/ban-ts-comment */
import gtStitch = require('@graphql-tools/stitch');
import UserSchema = require('./user');

export const usersSubschema = { User: UserSchema };

export const gatewaySchema = gtStitch.stitchSchemas({
  subschemas: [usersSubschema],
});
