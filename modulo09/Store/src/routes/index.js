const express = require('express');
const routes = express.Router();

const Home = require('../app/controllers/HomeController');
const users = require('./users');
const products = require('./products');
const cart = require('./cart');
const orders = require('./orders');

routes.get('/', Home.index);
routes.use('/users', users);
routes.use('/products', products);
routes.use('/cart', cart);
routes.use('/orders', orders);

// Alias
routes.get('/accounts', (req, res) => res.redirect("/users/login"));
routes.get('/ads/create', (req, res) => res.redirect("/products/create"));

module.exports = routes;