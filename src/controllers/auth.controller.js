import jwt from 'jsonwebtoken';
import User from '../models/User';
import config from '../config';
import Role from '../models/Role';

export const signUp = async (req, res) => {
  const {
    username, email, password, roles,
  } = req.body;

  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
  });

  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRoles.map((role) => role.id);
  } else {
    const role = await Role.findOne({ name: 'user' });
    newUser.roles = [role.id];
  }

  const savedUser = await newUser.save();
  console.log(savedUser);
  const token = jwt.sign({ id: savedUser.id }, config.SECRET, {
    expiresIn: 86400, // 24 hours
  });

  res.status(200).json({
    status: 'success',
    token,
  });
};

export const signIn = async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email }).populate('roles');

  if (!userFound) return res.status(404).json({ message: 'User not found' });

  const matchPassword = await User.comparePassword(req.body.password, userFound.password);

  if (!matchPassword) return res.status(401).json({ message: 'Invalid password' });

  const token = await jwt.sign({ id: userFound.id }, config.SECRET, {
    expiresIn: 86400, // 24 hours
  });

  return res.json({ status: 'success', token });
};
