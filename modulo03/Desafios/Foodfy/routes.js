const express = require('express');
const routes = express.Router();

const recipes = require("./data");

routes.get('/', (req, res) => res.render("index", { recipes }));
routes.get('/about', (req, res) => res.render("about"));
routes.get('/recipes', (req, res) => res.render("recipes", { recipes }));

routes.get('/recipe/:index', (req, res) => {
  const recipeIndex = req.params.index
  res.render("show", { recipe: recipes[recipeIndex] });
});

module.exports = routes;