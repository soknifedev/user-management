import fs from 'fs';
import jwt from "jsonwebtoken";
import {
    oauth
} from '../../config';

export const privateKey = fs.readFileSync(oauth.keys.private);
export const publicKey = fs.readFileSync(oauth.keys.public);

const create = payload => jwt.sign({
    ...payload,
    iss: oauth.iss
}, privateKey, oauth.options);

export const createTokenPair = (payload) => {

  const authToken    = create(payload);
  const refreshToken = create(payload);
  return { authToken, refreshToken, ...payload };
};

export const verify = (token) => jwt.verify(token, publicKey, oauth.options);