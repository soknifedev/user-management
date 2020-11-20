import assert from 'http-assert';
import { publicKey } from '../../util/Token';

export const get = async (req, res) => {
  const format = req.params.format;
  assert( publicKey, 503, "Certificate is not available at this moment");
  if(format == 'plain') {
    res.status(200).send(publicKey.toString());
  }
  else {
    res.success({
      publicKey: publicKey.toString()
    });
  }
};

