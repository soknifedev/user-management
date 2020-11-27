// import auth            from '../../../middleware/auth';
import * as controller from '../../controllers/v1/users';

import auth from '../../middlewares/v1/auth';
import express    from 'express';

const options = {
    prefix: '/users'
}

const router = express.Router();
router.options = options;

/**
 * Endpoints
 */

router.delete('/', controller.remove);
router.delete('/:userId', controller.remove);

router.post('/', controller.create);
router.post('/login', controller.login);

router.patch('/', controller.update);
router.patch('/:userId', controller.update);

router.get('/', [auth, controller.list]);
router.get('/:userId', [auth, controller.info]);

export default router;