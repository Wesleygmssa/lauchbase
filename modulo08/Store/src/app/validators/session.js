const { compare } = require('bcryptjs');

const User = require('../models/User');

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.render("session/login", { user: req.body, error: "Usuário não cadastrado!"});
  
    req.user = user;
    const passed = await compare(password, user.password);
  
    if (!passed) return res.render("session/login", { user: req.body, error: "Email ou senha incorreto(s)!" });
    req.user = user;

  } catch (error) {
    console.error(error);
  }

  next();
}

async function forgot(req, res, next) {
  const { email } = req.body;
  
  try {
    let user = await User.findOne({ where: {email} });
    if (!user) return res.render("session/forgot-password", { user: req.body, error: "Email não cadastrado." });
    req.user = user;
  } catch(err) {
    console.error(err);
  }

  next();
}

async function reset(req, res, next) {
  const { email, password, passwordRepeat, token } = req.body;

  try {
    let user = await User.findOne({ where: {email} });

    if (!user) return res.render("session/password-reset", {
      user: req.body,
      token,
      error: "Email não cadastrado."
    });

    if (password != passwordRepeat) return res.render("session/password-reset", {
      user: req.body,
      token,
      error: "Senha e repetição de senha estão incorretas."
    });

    if (token != user.reset_token) return res.render("session/password-reset", {
      user: req.body,
      token,
      error: "Token inválido! Solicite uma nova recuperação de senha."
    });

    let now = new Date();
    now = now.setHours(now.getHours);

    if (now > user.reset_token_expires) return res.render("session/password-reset", {
      user: req.body,
      token,
      error: "Token expirado! Solicite uma nova recuperação de senha."
    });
    
    req.user = user;

  } catch(err) {
    console.error(err);
  }

  next();
}

module.exports = {
  login,
  forgot,
  reset
}