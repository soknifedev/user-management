import * as Token from '../../util/Token';

import Session from '../../models/Session';
import User from '../../models/User';
import assert from 'http-assert';

export default (middleware) => async (req, res, next) => {

  const accessToken = (req.header.authorization || req.query.access_token || req.body.access_token)?.replace('Bearer ', '');
  assert(accessToken, 403, 'An active access token is required to access this resource.');

  const token = Token.verify(accessToken);
  assert(token, 401, 'Invalid access token');

  const user = await User.findById(token.sub);
  assert(user, 401, `Invalid access token: user ${token.sub} was not found or not longer exist !`);

  const session = await Session.findById(token.jwtid);

  req.locals.state.user    = user;
  req.locals.state.session = session;

  return next();

};