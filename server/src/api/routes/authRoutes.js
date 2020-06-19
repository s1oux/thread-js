import { Router } from 'express';

import * as authService from '../services/authService';
import * as userService from '../services/userService';

import { encrypt } from '../../helpers/cryptoHelper';
import { sendResetEmail } from '../../helpers/mailHelper';

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
  .post('/forgotPassword', (req, res, next) => {
    userService.getUserByEmail(req.body.email)
      .then(user => {
        encrypt(user.email)
          .then(token => {
            const updatedUser = {
              ...user.dataValues,
              resetPasswordToken: token,
              resetPasswordExpiresAt: Date.now() + (60 * 60 * 1000)
            };
            userService.update(updatedUser)
              .then(updUser => sendResetEmail(updUser, req.body.clientHost)
                .then(result => res.send(result))
                .catch(next))
              .catch(next);
          });
      })
      .catch(next);
  })
  .post('/token', (req, res, next) => userService.getUserByToken(decodeURIComponent(req.body.token))
    .then(user => res.send(user || { notfound: true }))
    .catch(next))
  .post('/resetPassword', (req, res, next) => {
    const { user, password } = req.body;
    userService.getUserByEmail(user.email)
      .then(userToUpdate => {
        encrypt(password)
          .then(encryptedPassword => {
            const updatedUser = {
              ...userToUpdate.dataValues,
              password: encryptedPassword,
              resetPasswordToken: null,
              resetPasswordExpiresAt: null
            };
            userService.update(updatedUser)
              .then(updUser => res.send(updUser))
              .catch(next);
          })
          .catch(next);
      })
      .catch(next);
  })
  .get('/user', jwtMiddleware, (req, res, next) => userService.getUserById(req.user.id)
    .then(data => res.send(data))
    .catch(next))
  .put('/user', (req, res, next) => userService.update(req.body)
    .then(data => res.send(data))
    .catch(next));
export default router;
