import { Request } from 'express';

// guard types
export type AuthPayload = {
  userid: string;
  admin: string;
  username: string;
};
export type AuthProductPayload = {
  userid: string;
  admin: string;
  username: string;
  idProduct:string;
};
export type AuthOrderPayload = {
  userid: string;
  admin: string;
  username: string;
  idOrder:string;
};
export type RequestWithAuth = Request & AuthPayload;
export type RequestWithAuthProduct = Request & AuthProductPayload;
export type RequestWithAuthOrder = Request & AuthOrderPayload;
