const data = require("../data.json");

module.exports = {
  index(req, res) {
    res.render("home/index", { recipes: data.recipes });
  },

  about(req, res) {
    res.render("home/about");
  },

  recipes(req, res) {
    res.render("home/recipes", { recipes: data.recipes });
  },

  show(req, res) {
    const recipeIndex = req.params.index;
    res.render("home/show", { recipe: data.recipes[recipeIndex] });
  }
}
