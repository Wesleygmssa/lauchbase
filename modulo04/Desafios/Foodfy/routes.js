const express = require('express');
const routes = express.Router();

const HomeController = require("./controllers/HomeController");
const AdminController = require("./controllers/AdminController");

routes.get('/', HomeController.index);
routes.get('/about', HomeController.about);
routes.get('/recipes', HomeController.recipes);
routes.get('/recipe/:index', HomeController.show);

routes.get("/admin/recipes", AdminController.index);
routes.get("/admin/recipes/create", AdminController.create);
routes.post("/admin/recipes", AdminController.post);
routes.get("/admin/recipes/:id", AdminController.show);
routes.get("/admin/recipes/:id/edit", AdminController.edit);
routes.put("/admin/recipes", AdminController.put); 
routes.delete("/admin/recipes", AdminController.delete);

module.exports = routes;