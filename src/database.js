import mongoose from 'mongoose';
import { error } from './libs/log';
import { createInitialUserData } from './libs/initialSetup';

export default async function setMongoConnection() {
  try {
    await mongoose.connect('mongodb://mongo:27017/ws_boilerplate_v1');
    createInitialUserData();
  } catch (errormsg) {
    error(errormsg);
  }
}
