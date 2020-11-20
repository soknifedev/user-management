import * as Token from '../util/Token';

import { Schema, model } from 'mongoose';

import {
  oauth
} from '../../config';

const sessionSchema = new Schema({
  appId: {
    required: true,
    type: String
  },
  issuer: {
    maxlength: 8,
    required: true,
    type: String
  },
  userId: {
    ref: 'user',
    required: true,
    type: Schema.Types.ObjectId
  },
  accessToken: {
    required: true,
    type: String
  }
});

sessionSchema.statics.createFromBody = async function(body) {
  const item = new this(body);
  const tokenPair = Token.createTokenPair({
    sub: item.userId,
    aud: item.appId,
    jwtid: item._id
  });
  
  item.issuer = oauth.iss;
  item.accessToken = tokenPair.authToken;  

  await item.save();
  return item;
};

export default model('Session', sessionSchema);
