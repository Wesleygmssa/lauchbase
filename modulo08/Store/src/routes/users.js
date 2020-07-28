const express = require('express');
const routes = express.Router();

const Session = require('../app/controllers/SessionController');
const User = require('../app/controllers/UserController');
const Order = require('../app/controllers/OrderController');

const { isLoggedRedirectToUsers, onlyUsers } = require('../app/middlewares/session');

const SessionValidator = require('../app/validators/session');
const UserValidator = require('../app/validators/user');

// Register
routes.get('/register', User.create);
routes.post('/register', UserValidator.post, User.post);

// Login and Logout
routes.get('/login', isLoggedRedirectToUsers, Session.loginForm);
routes.post('/login', SessionValidator.login, Session.login);
routes.post('/logout', Session.logout);

// Forgot and Reset password
routes.get('/forgot-password', Session.forgotForm);
routes.post('/forgot-password', SessionValidator.forgot, Session.forgot);

routes.get('/password-reset', Session.resetForm);
routes.post('/password-reset', SessionValidator.reset, Session.reset);

// User
routes.get('/', onlyUsers, UserValidator.show, User.show);
routes.put('/', onlyUsers, UserValidator.update, User.put);
routes.delete('/', onlyUsers, User.delete);

// Ads and Orders
routes.get('/ads', User.ads);
routes.post('/orders', onlyUsers, Order.post);

module.exports = routes;
