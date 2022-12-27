import { Router } from 'express';

import * as authCtrl from '../controllers/auth.controller';

const router = Router();

/**
 * @api {get} /api/auth/signUp Sign Up
 * @apiName signUp
 * @apiGroup Auth
 *
 * @apiBody {String} username       User nickname
 * @apiBody {String} email          User email
 * @apiBody {String} password       User password
 * @apiBody {String} [roles]        User roles
 *
 * @apiSuccess {String} status Status of the request.
 * @apiSuccess {String} token  Access token for user.
 *
 * @apiError {Object} error Error message
 */
router.post('/signup', authCtrl.signUp);

/**
 * @api {get} /api/auth/signUp Sign In
 * @apiName signIn
 * @apiGroup Auth
 *
 * @apiBody {String} email          User email
 * @apiBody {String} password       User password
 *
 * @apiSuccess {String} status Status of the request.
 * @apiSuccess {String} token  Access token for user.
 *
 * @apiError {Object} error Error message
 */
router.post('/signin', authCtrl.signIn);

export default router;
