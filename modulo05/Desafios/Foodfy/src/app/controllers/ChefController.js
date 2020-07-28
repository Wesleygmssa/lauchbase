const Chef = require('../models/Chef');

module.exports = {
  index(req, res) {
    Chef.all((chefs) => {
      res.render("admin/chefs/index", { chefs });
    });
  },

  create(req, res) {
    res.render("admin/chefs/create");
  },

  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") return res.send('Please, fill all fields!');
    }

    Chef.create(req.body, (chef) => {
      res.redirect(`/admin/chefs/${chef.id}`);
    });
  },

  show(req, res) {
    Chef.find(req.params.id, (chef) => {
      if (!chef) return res.send("Chef not found!");
      
      Chef.findChefRecipes(req.params.id, (recipes) => {
        res.render("admin/chefs/show", { chef, recipes });
      });
    });
  },

  edit(req, res) {
    Chef.find(req.params.id, (chef) => {
      if (!chef) return res.send("Chef not found!");
      res.render("admin/chefs/edit", { chef });
    });
  },

  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") return res.send('Please, fill all fields!');
    }

    Chef.update(req.body, () => {
      res.redirect(`/admin/chefs/${req.body.id}`);
    });
  },
  
  delete(req, res) {
    Chef.delete(req.body.id, () => {
      res.redirect(`/admin/chefs`);
    });
  }
}