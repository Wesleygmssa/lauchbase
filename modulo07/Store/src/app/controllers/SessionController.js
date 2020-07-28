const User = require('../models/User');

const { hash } = require('bcryptjs');
const crypto = require('crypto');
const mailer = require('../../lib/mailer');

module.exports = {
  loginForm(req, res) {
    try {
      return res.render("session/login");    
    } catch (error) {
      console.error(error);
    }
  },

  login(req, res) {
    try {
      req.session.userId = req.user.id;
      res.redirect("/users");
    } catch (error) {
      console.error(error);
    }
  },

  logout(req, res) {
    try {
      req.session.destroy();
      return res.redirect("/");    
    } catch (error) {
      console.error(error);
    }
  },

  forgotForm(req, res) {
    return res.render("session/forgot-password");
  },

  async forgot(req, res) {
    const user = req.user;

    try {
      const token = crypto.randomBytes(20).toString("hex");
      let now = new Date();
      now = now.setHours(now.getHours() + 1);

      await User.update(user.id, {
        reset_token: token,
        reset_token_expires: now
      });

      await mailer.sendMail({
        to: user.email,
        from: 'no-replay@launchstore.com.br',
        subject: 'Recuperar senha',
        html: `<h2>Perdeu a chave?</h2>
        <p>Não se preocupe, clique no link abaixo para recuperar sua senha.</p>
        <p>
          <a href="http://localhost:3000/users/password-reset?token=${token}" target="_blank">
            RECUPERAR SENHA
          </a>
        </p>
        `
      });

      res.render("session/forgot-password", { success: 'Verifique seu email para resetar a senha.' });

    } catch (error) {
      console.error(error);
      return res.render("session/forgot-password", {
        error: "Erro inesperado, tente novamente!"
      });
    }
  },

  resetForm(req, res) {
    return res.render("session/password-reset", { token: req.query.token });
  },

  async reset(req, res) {
    const user = req.user;
    const { password, token } = req.body;

    try {
      const newPassword = await hash(password, 8);
      await User.update(user.id, {
        password: newPassword,
        reset_token: "",
        reset_token_expires: ""
      });

      return res.render("session/login", { user: req.body, success: "Senha alterada com sucesso! Faça seu login." });
      
    } catch (error) {
      console.error(error);
      return res.render("session/password-reset", {
        user: req.body,
        token,
        error: "Erro inesperado, tente novamente!"
      });
    }
  }
}
