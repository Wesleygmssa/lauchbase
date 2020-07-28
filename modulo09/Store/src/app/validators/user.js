const { compare } = require('bcryptjs');

const User = require('../models/User');

function checkAllFields(body) {
  try {
    const keys = Object.keys(body);

    for (key of keys) {
      if (body[key] == "") return { user: body, error: "Por favor, preencha todos os campos!" }
    }

  } catch (error) {
    console.error(error);
  }
}

async function show(req, res, next) {
  try {
    const { userId: id } = req.session;
    const user = await User.findOne({ where: {id} });
    if (!user) return res.render("user/register", { error: "Usuário não encontrado!" });
    req.user = user;
  } catch (error) {
    console.error(error);
  }

  next();
}

async function post(req, res, next) {
  try {
    const fillAllFields = checkAllFields(req.body);
    if (fillAllFields) return res.render("user/register", fillAllFields);
    
    let { email, cpf_cnpj, password, passwordRepeat } = req.body;
  
    cpf_cnpj = cpf_cnpj.replace(/\D/g, "");
  
    const user = await User.findOne({
      where: { email },
      or: { cpf_cnpj }
    });
  
    if (user) return res.render("user/register", { user: req.body, error: "Usuário já existente!" });
  
    if (password != passwordRepeat) return res.render("user/register", {
      user: req.body,
      error: "As senhas não coincidem. Tente novamente!"
    });

  } catch (error) {
    console.error(error);
  }

  next();
}

async function update(req, res, next) {
  try {
    const fillAllFields = checkAllFields(req.body);
    if (fillAllFields) return res.render("user/index", fillAllFields);
  
    const { id, password } = req.body;
  
    if (!password) return res.render("user/index", { user: req.body, error: "Insira sua senha para atualizar seus dados." });
  
    const user = await User.findOne({ where: {id} });
    const passed = await compare(password, user.password);
  
    if (!passed) return res.render("user/index", { user: req.body, error: "Senha incorreta!" });
    req.user = user;

  } catch (error) {
    console.error(error);
  }

  next();
}

module.exports = {
  post,
  show,
  update
}