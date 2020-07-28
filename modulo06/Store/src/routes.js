const express = require('express');
const routes = express.Router();

const Home = require('./app/controllers/HomeController');
const Search = require('./app/controllers/SearchController');
const Product = require('./app/controllers/ProductController');

const multer = require('./app/middlewares/multer');

// Home
routes.get('/', Home.index);

// Search
routes.get('/products/search', Search.index);

// Products
routes.get('/products/create', Product.create);
routes.get('/products/:id', Product.show);
routes.get('/products/:id/edit', Product.edit);

routes.post('/products', multer.array("photos", 6), Product.post);
routes.put('/products', multer.array("photos", 6), Product.put);
routes.delete('/products', Product.delete);

// Alias
routes.get('/ads/create', (req, res) => res.redirect("/products/create"));

module.exports = routes;