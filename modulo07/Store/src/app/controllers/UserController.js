const User = require('../models/User');

const { formatCpfCnpj, formatCep } = require('../../lib/utils');

module.exports = {
  create(req, res) {
    return res.render("user/register");
  },

  async post(req, res) {
    try {
      const userId = await User.create(req.body);
      req.session.userId = userId;
      return res.redirect("/users");
    } catch (error) {
      console.error(error);
    }
  },

  async show(req, res) {
    try {
      const { user } = req;
      user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj);
      user.cep = formatCep(user.cep);
      return res.render("user/index", { user });
    } catch (error) {
      console.error(error);
    }
  },

  async put(req, res) {
    try {
      const { user } = req;
      let { name, email, cpf_cnpj, cep, address } = req.body;
  
      cpf_cnpj = cpf_cnpj.replace(/\D/g, "");
      cep = cep.replace(/\D/g, "");
  
      await User.update(user.id, {
        name,
        email,
        cpf_cnpj,
        cep,
        address
      });
  
      return res.render("user/index", { user: req.body, success: "Seus dados foram atualizados com sucesso!" });

    } catch (error) {
      console.error(error);
    }
  },

  async delete(req, res) {
    try {
      await User.delete(req.body.id);
      req.session.destroy();
      return res.render("session/login", { success: "Usuário deletado com sucesso!" });
    } catch (error) {
      console.error(error);
    }
  }
}