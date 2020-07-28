const Recipe = require('../models/Recipe');

module.exports = {
  index(req, res) {
    Recipe.all((recipes) => {
      res.render("admin/recipes/index", { recipes });
    });
  },

  create(req, res) {
    Recipe.chefsSelectOptions((options) => {
      res.render("admin/recipes/create.njk", { chefOptions: options });
    });
  },

  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "" && key != 'information') return res.send('Please, fill all fields!');
    }

    Recipe.create(req.body, (recipe) => {
      res.redirect(`/admin/recipes/${recipe.id}`);
    });
  },

  show(req, res) {
    Recipe.find(req.params.id, (recipe) => {
      if (!recipe) return res.send("Recipe not found!");
      res.render("admin/recipes/show", { recipe });
    });
  },

  edit(req, res) {
    Recipe.find(req.params.id, (recipe) => {
      if (!recipe) return res.send("Recipe not found!");

      Recipe.chefsSelectOptions((options) => {
        res.render("admin/recipes/edit", { recipe, chefOptions: options });
      });
    });
  },

  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "" && key != 'information') return res.send('Please, fill all fields!');
    }

    Recipe.update(req.body, () => {
      res.redirect(`/admin/recipes/${req.body.id}`);
    });
  },
  
  delete(req, res) {
    Recipe.delete(req.body.id, () => {
      res.redirect(`/admin/recipes`);
    });
  }
}