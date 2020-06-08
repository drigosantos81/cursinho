const express = require('express');
const routes = express.Router();
const professores = require('./app/controllers/professores');
const alunos = require('./app/controllers/alunos');

routes.get("/", function(req, res) {
    return res.redirect("/home");
});

routes.get("/home", function(req, res) {
    return res.render("home");
});

// PROFESSORES
routes.get("/professores", professores.index); // Página inicial
routes.get("/professores/create", professores.create); // Página de cadastro
routes.post("/professores", professores.post); // Comando do cadastro
routes.get("/professores/:id", professores.show); // Exibe dados do cadastro
routes.get("/professores/:id/edit", professores.edit); // Página que exibe os campos do cadastro editáveis
routes.put("/professores", professores.put); // Comando que salva as alterações do cadastro
routes.delete("/professores", professores.delete); // Comando que deleta um cadastro

// ALUNOS
routes.get("/alunos", alunos.index); // Página inicial
routes.get("/alunos/create", alunos.create); // Página de cadastro
routes.post("/alunos", alunos.post); // Comando do cadastro
routes.get("/alunos/:id", alunos.show); // Exibe dados do cadastro
routes.get("/alunos/:id/edit", alunos.edit); // Página que exibe os campos do cadastro editáveis
routes.put("/alunos", alunos.put); // Comando que salva as alterações do cadastro
routes.delete("/alunos", alunos.delete); // Comando que deleta um cadastro

module.exports = routes;
