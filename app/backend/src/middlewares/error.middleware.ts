import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (erro, _req, res, _next) => {
  if (erro.status) return res.status(erro.status).json({ message: erro.message });
  if (erro.message === 'jwt malformed') {
    return res.status(401).json({
      message: 'Token must be a valid token' });
  }
  if (erro.message === 'jwt erro') {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  return res.status(500).json({ message: erro.message });
};

export default errorMiddleware;
