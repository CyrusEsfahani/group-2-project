import { Router } from 'express';
import  User  from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email },
  });
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
  
  const id = user.dataValues.id;
  const username = user.dataValues.username;
  const secretKey = process.env.JWT_SECRET_KEY || '';

  const token = jwt.sign({ email, id, username }, secretKey, { expiresIn: '8h' });
  return res.json({ token });
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
