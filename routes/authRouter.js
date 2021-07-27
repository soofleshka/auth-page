const authRouter = require('express').Router();
const authController = require('../controllers/authController');

authRouter.post(
  '/register',
  authController.validateRegisterParams,
  authController.registerUser
);

authRouter.post(
  '/login',
  authController.validateLoginParams,
  authController.loginUser
);

module.exports = authRouter;
