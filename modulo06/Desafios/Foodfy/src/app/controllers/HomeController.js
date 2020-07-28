const Recipe = require('../models/Recipe');
const Chef = require('../models/Chef');

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
    return res.render("home/index", { recipes });
  },

  about(req, res) {
    return res.render("home/about");
  },

  async recipes(req, res) {
    let { page, limit } = req.query;
    
    page = page || 1;
    limit = limit || 3;
    let offset = limit * (page - 1);
    
    const params = { page, limit, offset };
    
    let results = await Recipe.paginate(params);
    let recipes = results.rows;

    const pagination = { total: Math.ceil(recipes[0].total / limit), page }

    const filesPromise = recipes.map(async recipe => {
      results = await Recipe.files(recipe.id);
      let file = results.rows[0];

      file = { ...file, src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}` };
      return recipe = { ...recipe, file };
    });

    recipes = await Promise.all(filesPromise);
    return res.render("home/recipes", { recipes, pagination });
  },

  async show(req, res) {
    let results = await Recipe.find(req.params.id);
    const recipe = results.rows[0];

    if (!recipe) return res.send("Receita não encontrada!");

    results = await Recipe.files(recipe.id);
    let files = results.rows;
    
    files = files.map(file => ({ ...file, src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}` }));
    return res.render("home/show", { recipe, files });
  },

  async chefs(req, res) {
    const results = await Chef.all();
    let chefs = results.rows;

    chefs = chefs.map(chef => ({
      ...chef,
      path: `${req.protocol}://${req.headers.host}${chef.path.replace("public", "").replace("\\images\\", "/images/")}`
    }));
        
    return res.render("home/chefs", { chefs });
  },

  async search(req, res) {
    const { filter } = req.query;

    let results = await Recipe.findBy(filter);
    let recipes = results.rows;
 
    const filesPromise = recipes.map(async recipe => {
      results = await Recipe.files(recipe.id);
      let file = results.rows[0];
      
      file = { ...file, src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}` }
      return recipe = { ...recipe, file };
    });

    recipes = await Promise.all(filesPromise);
    return res.render("home/search", { recipes, filter });
  }
}