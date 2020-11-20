// import auth            from '../../../middleware/auth';
import * as controller from '../../controllers/v1/certificate';

import express    from 'express';

const options = {
    prefix: '/certificate'
}

const router = express.Router();
router.options = options;

/**
 * Endpoints
 */

router.get('/', controller.get);
router.get('/:format', controller.get);

export default router;