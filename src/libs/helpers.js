import User from '../models/User';
import Role from '../models/Role';
import app from '../app';

export const compareToRootId = (sourceId) => sourceId === app.get('rootId');

export const isAdmin = async (userId) => {
  try {
    const adminRole = await Role.findOne({ name: 'admin' });
    const foundUser = await User.findById(userId);
    return foundUser.roles.includes(adminRole.id);
  } catch (error) {
    console.error(error);
    return false;
  }
};
