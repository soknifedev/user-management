import * as Token from '../../util/Token';

import Session from '../../models/Session';
import User from '../../models/User';
import assert from 'http-assert';

export default async (req, res, next) => {

  const accessToken = (req.headers.authorization || req.query.access_token || req.body.access_token)?.replace('Bearer ', '');
  assert(accessToken, 403, 'An active access token is required to access this resource.');

  let token;
  try {
    token = Token.verify(accessToken);
  }
  catch(e) {
    assert(token, 401, e);
  }

  const user = await User.findById(token.sub);
  assert(user, 401, `Invalid access token: user ${token.sub} was not found or not longer exist !`);

  const session = await Session.findById(token.jwtid);

  if(!req.state) {
    req.state = {}; 
  }
  req.state.user    = user;
  req.state.session = session;

  return await next();

};