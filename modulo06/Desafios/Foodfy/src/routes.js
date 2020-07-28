const express = require('express');
const routes = express.Router();

const Home = require("./app/controllers/HomeController");
const Recipe = require("./app/controllers/RecipeController");
const Chef = require("./app/controllers/ChefController");

const multer = require("./app/middlewares/multer");

routes.get('/', Home.index);
routes.get('/about', Home.about);
routes.get('/recipes', Home.recipes);
routes.get('/recipe/:id', Home.show);
routes.get('/chefs', Home.chefs);
routes.get('/search', Home.search);

routes.get('/admin', (req, res) => res.redirect("/admin/recipes"));
routes.get('/admin/recipes', Recipe.index);
routes.get('/admin/recipes/create', Recipe.create);
routes.get('/admin/recipes/:id', Recipe.show);
routes.get('/admin/recipes/:id/edit', Recipe.edit);

routes.post('/admin/recipes', multer.array("photos", 5), Recipe.post);
routes.put('/admin/recipes', multer.array("photos", 5), Recipe.put); 
routes.delete('/admin/recipes', Recipe.delete);

routes.get('/admin/chefs', Chef.index);
routes.get('/admin/chefs/create', Chef.create);
routes.get('/admin/chefs/:id', Chef.show);
routes.get('/admin/chefs/:id/edit', Chef.edit);

routes.post('/admin/chefs', multer.single("avatar"), Chef.post);
routes.put('/admin/chefs', multer.single("avatar"), Chef.put); 
routes.delete('/admin/chefs', Chef.delete);

module.exports = routes;