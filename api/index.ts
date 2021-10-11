import { ApiServer } from './server/index';

import mongoose from 'mongoose';

const mongoDB = 'mongodb://127.0.0.1/api';
mongoose.connect(mongoDB);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const server = new ApiServer();
server.start(5000);
