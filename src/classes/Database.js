import config   from '../../config';
import mongoose from 'mongoose';
import mongooseUniqueValidation from 'mongoose-beautiful-unique-validation';

mongoose.plugin(mongooseUniqueValidation);

const errorCodes = {
  DuplicateKey: 11000
};

export default class Database {

  static get Error() {
    return errorCodes;
  }
  
  static get isConnected() {
    return (Database.state == mongoose.STATES.connected || Database.state == mongoose.STATES.connecting);
  }

  static get state() {
    return mongoose.connection.readyState;
  }


  static connect() {
    mongoose.set('useCreateIndex', true);
    
    return mongoose.connect(config.db.connectionUrl, {
      useNewUrlParser:    true,
      useUnifiedTopology: true
    });
  }

  static disconnect() {
    return mongoose.disconnect();
  }

  static isError(err, code) {
    return err && (err.code == code);
  }
}
