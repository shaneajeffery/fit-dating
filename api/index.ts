/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
// const restify = require('restify');
// const mongoose = require('mongoose');
// const restifyPlugins = require('restify-plugins');
// const config = require('./config');

// const server = restify.createServer({
//   name: config.name,
//   version: config.version,
// });

// server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
// server.use(restifyPlugins.acceptParser(server.acceptable));
// server.use(restifyPlugins.queryParser({ mapParams: true }));
// server.use(restifyPlugins.fullResponse());

// server.listen(config.port, () => {
//   mongoose.Promise = global.Promise;
//   mongoose.connect(config.db.uri);

//   const db = mongoose.connection;

//   db.on('error', (err: any) => {
//     console.error(err);
//     process.exit(1);
//   });

//   db.once('open', () => {
//     require('./routes')(server);
//     console.log(`Server is listening on port ${config.port}`);
//   });
// });

import { ApiServer } from './server/index';

import mongoose = require('mongoose');

const mongoDB = 'mongodb://127.0.0.1/api';
mongoose.connect(mongoDB);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const server = new ApiServer();
server.start(5000);
