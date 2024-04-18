import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

export function isAuthenticated(request: Request, response: Response, next: () => void) {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return response.status(401).json({ message: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    request.body.user = decoded;
    next();
  } catch (e) {
    response.status(403).json({ message: 'Forbidden' });
  }
}
