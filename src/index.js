import Database from './classes/Database';
import app      from './app';
import config   from '../config';
import assert   from 'assert';

if(config.mode == 'dev') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

const bootstrap = async () => {
  // await Database.connect();
  assert(config?.api?.port, "Please specify a port to listen on for the RESTFul API in the config.json file");
  app.listen(config?.api?.port);
};

bootstrap()
  .then  (()  => console.log('Listening on port ' + config?.api?.port))
  .catch (err => console.error(err));