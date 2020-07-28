const fs = require('fs');
const data = require("../data.json");

module.exports = {
  index(req, res) {
    res.render("admin/index", { recipes: data.recipes });
  },

  create(req, res) {
    res.render("admin/create");
  }, 
  
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") return res.send("Please, fill all fields!");
    }

    let id = 1;
    const lastRecipe = data.recipes[data.recipes.length - 1];

    if (lastRecipe) {
      id = lastRecipe + 1;
    }

    console.log(id);

    data.recipes.push({
      id,
      ...req.body
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
      if (err) return res.send("Write file error!");
      res.redirect(`recipes/${id}`);
    });
  },

  show(req, res) {
    const { id } = req.params;

    const foundRecipe = data.recipes.find((recipe) => recipe.id == id);
    if (!foundRecipe) return res.send("Recipe not found!");

    const recipe = {
      ...foundRecipe
    };

    res.render("admin/show", { recipe });
  },

  edit(req, res) {
    const { id } = req.params;

    const foundRecipe = data.recipes.find((recipe) => recipe.id == id);
    if (!foundRecipe) return res.send("Recipe not found!");

    const recipe = {
      ...foundRecipe,
    };

    res.render("admin/edit", { recipe });
  },

  put(req, res) {
    const { id } = req.body;
    let index = 0;

    const foundRecipe = data.recipes.find((recipe, foundIndex) => {
      if (id == recipe.id) {
        index = foundIndex;
        return true;
      }
    });

    if (!foundRecipe) return res.send("Recipe not found!");

    const recipe = {
      ...foundRecipe,
      ...req.body,
      id: Number(req.body.id)
    };

    data.recipes[index] = recipe;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
      if (err) return res.send("Write file error!");
      res.redirect(`recipes/${id}`);
    });
  },

  delete(req, res) {
    const { id } = req.body;

    const filteredRecipes = data.recipes.filter((recipe) => recipe.id != id);
    data.recipes = filteredRecipes;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
      if (err) return res.send("Write file error!");
      res.redirect("/admin/recipes");
    });
  }
}