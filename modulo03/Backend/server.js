const express = require('express');
const nunjucks = require('nunjucks');

const videos = require("./data");

const server = express();

server.use(express.static('public'));
server.set("view engine", "njk");

nunjucks.configure("views", { 
  express: server, 
  autoescape: false,
  noCache: true
});

server.get("/", (req, res) => {
  const about = {
    avatar_url: "https://avatars0.githubusercontent.com/u/40154329?s=460&v=4",
    name: "João Debussy",
    role: "Co-founder Neonix",
    description: 'Desenvolvedor Júnior, treinando para melhorar a cada dia. Acesse o <a href="http://neonix.com.br">Neonix</a>',
    socials: [
      { name: "Github", url: "https://github.com/dbssy" },
      { name: "Twitter", url: "https://twitter.com/dbssy_" },
      { name: "Linkedin", url: "https://www.linkedin.com/in/dbssy/" }
    ]
  };

  return res.render("about", { about });
});

server.get("/classes", (req, res) => {
  return res.render("classes", { items: videos });
});

server.get("/video", (req, res) => {
  const id = req.query.id;

  const video = videos.find((video) => { return video.id == id });

  if (!video) {
    return res.send("Video not found.");
  }

  return res.render("video", { item: video });
});

server.listen(5000, () => {
  console.log('[Server]', 'is running');
});