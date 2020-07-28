const Recipe = require('../models/Recipe');
const File = require('../models/File');
const RecipeFile = require('../models/RecipeFile');

module.exports = {
  async index(req, res) {
    let results = await Recipe.all();
    let recipes = results.rows;

    const filesPromise = recipes.map(async recipe => {
      results = await Recipe.files(recipe.id);
      let file = results.rows[0];
      
      file = { ...file, src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}` };
      return recipe = { ...recipe, file };
    });
    
    recipes = await Promise.all(filesPromise);
    return res.render("admin/recipes/index", { recipes });
  },

  async create(req, res) {
    const results = await Recipe.chefsSelectOptions();
    const chefOptions = results.rows;
    return res.render("admin/recipes/create.njk", { chefOptions });
  },

  async post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "" && key != 'information') return res.send("Por favor, preencha todos os campos!");
    }

    if (req.files.length == 0) res.send("Envie pelo menos uma foto");

    const results = await Recipe.create(req.body);
    const recipeId = results.rows[0].id;

    const filesPromise = req.files.map(file => File.create({ ...file }));
    let files = await Promise.all(filesPromise);

    const recipeFilesPromise = files.map(file => RecipeFile.create(recipeId, file.rows[0].id));
    await Promise.all(recipeFilesPromise);
    return res.redirect(`/admin/recipes/${recipeId}`);
  },

  async show(req, res) {
    let results = await Recipe.find(req.params.id);
    const recipe = results.rows[0];

    if (!recipe) return res.send("Receita não encontrada!");

    results = await Recipe.files(recipe.id);
    let files = results.rows;

    files = files.map(file => ({ ...file, src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}` }));
    return res.render("admin/recipes/show", { recipe, files });
  },

  async edit(req, res) {
    let results = await Recipe.find(req.params.id);
    const recipe = results.rows[0];

    if (!recipe) return res.send("Receita não encontrada!");

    results = await Recipe.files(recipe.id);
    let files = results.rows;

    files = files.map(file => ({ ...file, src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}` }));

    results = await Recipe.chefsSelectOptions();
    const chefOptions = results.rows;
    return res.render("admin/recipes/edit", { recipe, chefOptions, files });
  },

  async put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "" && key != 'information' && key != "removed_files") { 
        return res.send("Por favor, preencha todos os campos!");
      }
    }

    if (req.files.length != 0) {
      const newFilesPromise = req.files.map(file => File.create({ ...file }));
      const newFiles = await Promise.all(newFilesPromise);
      const newRecipeFilesPromise = newFiles.map(file => Recipe_File.create(req.body.id, file.rows[0].id));
      await Promise.all(newRecipeFilesPromise);
    }

    if (req.body.removed_files) {
      const removedFiles = req.body.removed_files.split(",");
      const lastIndex = removedFiles.length - 1;

      removedFiles.splice(lastIndex, 1);

      const removedFilesPromise = removedFiles.map(id => File.delete(id));
      await Promise.all(removedFilesPromise);
    }

    await Recipe.update(req.body);
    return res.redirect(`/admin/recipes/${req.body.id}`);
  },
  
  async delete(req, res) {
    await Recipe.delete(req.body.id);
    return res.redirect(`/admin/recipes`);
  }
}