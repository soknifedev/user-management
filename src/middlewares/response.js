import config from '../../config';

const error = (req, res, error, statusCode) => {
  if(!/development|dev/iu.test(config.mode)) {
    if(error && error.hasOwnProperty('_message')) {
      error.message = error._message;
    }
  }
  let e = new Error(error);
  e.code = statusCode || 400;
  console.log('ERROR MIDDLEWARE: ', e)
  throw e;
};

const success = (req, res, result, statusCode) => {

  let obj = { success: true };

  if (result?.message) {
    obj.message = result.message;
    delete result.message;
    if(Object.keys(result).length !== 0) {
      obj.data = result;
    }
  }

  res.status(statusCode || 200).send(obj);
};

export default (req, res, next) => {
  res.error     = (err, statusCode)                   => error  (req, res, err, statusCode);
  res.success   = (result, statusCode)                => success(req, res, result, statusCode);
  next();
};