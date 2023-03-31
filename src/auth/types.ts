import { Request } from 'express';

// guard types
export type AuthPayload = {
  userid: string;
  admin: string;
  username: string;
};

export type RequestWithAuth = Request & AuthPayload;
