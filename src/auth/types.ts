import { Request } from 'express';

// validate token
export type AuthPayload = {
  userid: string;
  username: string;
};
export type RequestWithAuth = Request & AuthPayload;
// Product
export type AuthProductPayload = {
  userid: string;
  username: string;
  idProduct:string;
};
export type RequestWithAuthProduct = Request & AuthProductPayload;
// Trading Order
export type AuthOrderPayload = {
  userid: string;
  username: string;
  idOrder:string;
};
export type RequestWithAuthOrder = Request & AuthOrderPayload;
// Wallet 
export type WalletPayload = {
  userid: string;
  username: string;
  walletPassword:string;
};
export type RequestWithWalletPayload = Request & WalletPayload;
