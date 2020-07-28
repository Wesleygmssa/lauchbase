const Recipe = require('../models/Recipe');
const Chef = require('../models/Chef');

module.exports = {
  index(req, res) {
    let { filter, page, limit } = req.query;

    page = page || 1;
    limit = limit || 2;
    let offset = limit * (page - 1);

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(recipes) {
        const pagination = {
          total: Math.ceil(recipes[0].total / limit),
          page
        }

        res.render("home/index", { recipes, pagination, filter });
      }
    }

    Recipe.paginate(params);
  },

  about(req, res) {
    res.render("home/about");
  },

  recipes(req, res) {
    let { filter, page, limit } = req.query;

    page = page || 1;
    limit = limit || 2;
    let offset = limit * (page - 1);

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(recipes) {
        const pagination = {
          total: Math.ceil(recipes[0].total / limit),
          page
        }

        res.render("home/recipes", { recipes, pagination, filter });
      }
    }

    Recipe.paginate(params);
  },

  show(req, res) {
    Recipe.find(req.params.id, (recipe) => {
      if (!recipe) return res.send("Recipe not found!");
      res.render("home/show", { recipe });
    });
  },

  chefs(req, res) {
    Chef.all((chefs) => {
      res.render("home/chefs", { chefs });
    });
  },

  search(req, res) {
    const { filter } = req.query;
    
    if (filter) {
      Recipe.findBy(filter, (recipes) => {
        res.render("home/search", { filter, recipes });
      });

    } else { 
      Recipe.all((recipes) => {
        res.render("home/search", { recipes });
      });
    }
  }
}