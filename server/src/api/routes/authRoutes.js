import { Router } from 'express';

import * as authService from '../services/authService';
import * as userService from '../services/userService';

import authenticationMiddleware from '../middlewares/authenticationMiddleware';
import registrationMiddleware from '../middlewares/registrationMiddleware';
import jwtMiddleware from '../middlewares/jwtMiddleware';

const router = Router();

// user added to the request (req.user) in a strategy, see passport config
router
  .post('/login', authenticationMiddleware, (req, res, next) => authService.login(req.user)
    .then(data => res.send(data))
    .catch(next))
  .post('/register', registrationMiddleware, (req, res, next) => authService.register(req.user)
    .then(data => res.send(data))
    .catch(next))
  .post('/forgotPassword', (req, res, next) => userService.sendResetTokenByEmail(req.body.email, req.body.clientHost)
    .then(result => res.send(result))
    .catch(next))
  .post('/token', (req, res, next) => userService.getUserByToken(decodeURIComponent(req.body.token))
    .then(result => res.send(result))
    .catch(next))
  .post('/resetPassword', (req, res, next) => userService.resetPassword(req.body)
    .then(result => res.json(result))
    .catch(next))
  .get('/user', jwtMiddleware, (req, res, next) => userService.getUserById(req.user.id)
    .then(data => res.send(data))
    .catch(next))
  .put('/user', (req, res, next) => userService.update(req.body)
    .then(data => res.send(data))
    .catch(next));
export default router;
