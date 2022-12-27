import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/User';

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).json({ message: 'No token provided on request' });

    const decodedToken = jwt.verify(token, config.SECRET);
    req.userId = decodedToken.id;

    const userToken = await User.findById(req.userId, { password: 0 });
    if (!userToken) return res.status(403).json({ message: 'User Token not found' });

    return next();
  } catch (error) {
    return res.status(403).json({ message: error });
  }
};
