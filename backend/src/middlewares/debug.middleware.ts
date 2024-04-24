import { Request, Response } from "express";

export function debug(request: Request, response: Response, next: () => void) {
  console.log('--------------------');
  console.log('REQUEST URL', request.url);
  console.log('REQUEST PARAMS', request.params);
  console.log('REQUEST BODY', request.body);
  // console.log('REQUEST HEADERS', request.headers);
  next();
}