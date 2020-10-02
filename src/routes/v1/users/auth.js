import express    from 'express';
// import auth            from '../../../middleware/auth';
import * as controller from '../../../controllers/v1/users/auth';

const options = {
    prefix: '/user/auth'
}

const router = express.Router();
router.options = options;

/**
 * Endpoints
 */
router.post('/refresh-token', controller.refreshToken);
router.post('/sign-in', controller.signIn);
router.post('/sign-up', controller.signUp);
router.get('/sign-out', controller.signOut);

export default router;