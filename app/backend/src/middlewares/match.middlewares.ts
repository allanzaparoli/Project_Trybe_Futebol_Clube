import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import ErrorHandler from '../utils/errorHandler.utils';

dotenv.config();

const token = process.env.JWT_SECRET || 'jwt_secret';

const validmatchMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  const { authorization } = req.headers;
  const { homeTeam, awayTeam } = req.body;
  if (homeTeam === awayTeam) {
    throw new ErrorHandler(
      422,
      'It is not possible to create a match with two equal teams',
    );
  }
  if (!authorization) return next(new ErrorHandler(404, 'Token not found'));

  const data = jwt.verify(authorization, token) as { data: jwt.JwtPayload };

  const { role } = JSON.parse(JSON.stringify(data));

  if (!role) return next(new ErrorHandler(404, 'Token must be a valid token'));

  next();
};

export default validmatchMiddleware;
