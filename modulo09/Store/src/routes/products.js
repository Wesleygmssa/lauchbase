const express = require('express');
const routes = express.Router();

const multer = require('../app/middlewares/multer');

const Product = require('../app/controllers/ProductController');
const Search = require('../app/controllers/SearchController');

// Search
routes.get('/search', Search.index);

// Products
routes.get('/create', Product.create);
routes.get('/:id', Product.show);
routes.get('/:id/edit', Product.edit);

routes.post('/', multer.array("photos", 6), Product.post);
routes.put('/', multer.array("photos", 6), Product.put);
routes.delete('/', Product.delete);

module.exports = routes;