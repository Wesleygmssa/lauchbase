const express = require('express');
const routes = express.Router();

const HomeController = require("./app/controllers/HomeController");
const RecipeController = require("./app/controllers/RecipeController");
const ChefController = require("./app/controllers/ChefController");

routes.get('/', HomeController.index);
routes.get('/about', HomeController.about);
routes.get('/recipes', HomeController.recipes);
routes.get('/recipe/:id', HomeController.show);
routes.get('/chefs', HomeController.chefs);
routes.get('/search', HomeController.search);

routes.get('/admin', (req, res) => res.redirect("/admin/recipes"));
routes.get('/admin/recipes', RecipeController.index);
routes.get('/admin/recipes/create', RecipeController.create);
routes.post('/admin/recipes', RecipeController.post);
routes.get('/admin/recipes/:id', RecipeController.show);
routes.get('/admin/recipes/:id/edit', RecipeController.edit);
routes.put('/admin/recipes', RecipeController.put); 
routes.delete('/admin/recipes', RecipeController.delete);

routes.get('/admin/chefs', ChefController.index);
routes.get('/admin/chefs/create', ChefController.create);
routes.post('/admin/chefs', ChefController.post);
routes.get('/admin/chefs/:id', ChefController.show);
routes.get('/admin/chefs/:id/edit', ChefController.edit);
routes.put('/admin/chefs', ChefController.put); 
routes.delete('/admin/chefs', ChefController.delete);

module.exports = routes;