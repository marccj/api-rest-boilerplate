import Role from '../models/Role';
import User from '../models/User';
import config from '../config';
import app from '../app';

import { info, important } from './log';

export const createInitialUserData = async () => {
  try {
    info('Creating roles if needed...');
    const count = await Role.estimatedDocumentCount();

    if (count <= 0) {
      const userRole = new Role({ name: 'user' });
      var adminRole = new Role({ name: 'admin' });

      await Promise.all([
        userRole.save(),
        adminRole.save(),
      ]);
    }

    info('Creating root user if needed...');
    const existingRoot = await User.findOne({ username: 'root' });
    if (existingRoot) {
      app.set('rootId', existingRoot.id);
      important(`Root user id => [${app.get('rootId')}]`);
      return;
    }

    var adminRole = await Role.findOne({ name: 'admin' });
    const rootUser = new User({
      username: 'root',
      email: config.ROOT_USER_EMAIL,
      password: await User.encryptPassword(config.ROOT_USER_PASS),
      roles: [adminRole.id],
    });

    const savedRoot = await rootUser.save();

    app.set('rootId', savedRoot.id);
    important(`Root user id => [${app.get('rootId')}]`);
  } catch (error) {
    console.error(error);
  }
};

/** export const createRoles = async () => {
  try {
    info('Creating roles if needed...');
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return;

    const userRole = new Role({ name: 'user' });
    const adminRole = new Role({ name: 'admin' });

    await Promise.all([
      userRole.save(),
      adminRole.save(),
    ]);
  } catch (error) {
    console.error(error);
  }
};

export const createRootUser = async () => {
  try {
    info('Creating root user if needed...');
    const existingRoot = await User.findOne({ username: 'root' });
    if (existingRoot) {
      global.rootId = existingRoot.id;
      important(`Root user id => [${global.rootId}]`);
      return;
    }

    const adminRole = await Role.findOne({ name: 'admin' });
    const rootUser = new User({
      username: 'root',
      email: config.ROOT_USER_EMAIL,
      password: await User.encryptPassword(config.ROOT_USER_PASS),
      roles: [adminRole.id],
    });

    const savedRoot = await rootUser.save();

    global.rootId = savedRoot.id;
    important(`Root user id => [${global.rootId}]`);
  } catch (error) {
    console.error(error);
  }
}; */
