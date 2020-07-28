const express = require('express');
const routes = express.Router();

const courses = require('./data');

routes.get("/", (req, res) => res.render("index"));

routes.get("/about", (req, res) => {
  const about = {
    avatar_url: "https://avatars0.githubusercontent.com/u/28929274?s=200&v=4",
    name: "Rocketseat",
    description: "Plataforma de educação em tecnologia 🚀",
    techs: [
      { name: "NodeJS" },
      { name: "React JS" },
      { name: "React Native" }
    ]
  };

  res.render("about", { about });
});

routes.get("/courses", (req, res) => res.render("courses", { items: courses }));

routes.get("/courses/:id", (req, res) => {
  const id = req.params.id;
  const course = courses.find((courses) => { return courses.id == id });
  if (!course) return res.render("not-found");
  res.render("course", { item: course });
});

routes.use((req, res) => res.status(404).render("not-found"));

module.exports = routes;