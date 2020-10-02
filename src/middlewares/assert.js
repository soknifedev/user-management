import config   from '../../config';

  export default (err, req, res, next) => {
    console.log(err)

    let obj = { success: false };

    let errArray = [];
    let mongoErrors = err?.errors;
    if(mongoErrors) {
      // console.log('has mongo errors:', mongoErrors);
  
      for (let idx in mongoErrors) {
        if (mongoErrors.hasOwnProperty(idx)) {
          let mError = mongoErrors[idx];
          if(mError?.properties?.message && mError?.properties.value) {
            // console.log('Valued mongoError catched: ', mError.properties.message, mError.properties.value)
            errArray.push(mError.properties.message, mError.properties.value)
          }
          else if(mError?.properties?.message) {
            // console.log('No valued mongoError catched: ', mError.properties.message)
            errArray.push(mError.properties.message)
          }
          else {
            // console.log('CANNOT PARSE MONGO ERROR:', err);
          }
        }
        if(errArray.length > 0) {
          error = errArray.join('; ');
        }
      }
  
    }
  
    if (err) {
      if(typeof err === 'string') {
        err = { message: err };
      }
      obj.err = { code: err.code, message: err.message };
    }
  
    // errorCode must be a number.
    if(obj.err && isNaN(obj.err.code) ) {
      obj.err.type = obj.err.code;
      delete obj.err.code;
    }
    if(config.mode == 'dev') {
        obj.stackTrace = err.stack;
    }
    let statusCode = err?.statusCode || 500;
    res.status(statusCode).send(obj)
  };