import app from './app';
import setMongoConnection from './database';
import {
  info, success,
} from './libs/log';

const db = require('mongoose').connection;

const APP_PORT = 3000;

try {
  info('Starting mongoDB connection...');

  setMongoConnection();

  db.on('connected', () => {
    success('Connected to MongoDB successfully.');
    app.listen(APP_PORT);
    success('Server listening on port:', APP_PORT);
  });
} catch (error) {
  error('Server could not start due an error');
  console.log(error);
}
