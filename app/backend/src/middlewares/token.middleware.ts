import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import Errorhandler from '../utils/errorHandler.utils';

dotenv.config();

const secret = process.env.JWT_SECRET || 'jwt_secret';

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) return next(new Errorhandler(404, 'Token not found'));

  const data = jwt.verify(authorization, secret) as { data: jwt.JwtPayload };
  const { role } = JSON.parse(JSON.stringify(data));

  if (!role) return next(new Errorhandler(404, 'Token must be a valid token'));

  return res.status(200).json({ role });
};

export default validateToken;
