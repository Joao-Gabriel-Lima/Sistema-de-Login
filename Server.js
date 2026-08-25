const fs = require("fs");

const express = require("express");
const app = express();

const bycrypt = require("bcrypt");

app.use(express.static("public"));

app.use(express.json());

app.post("/cadastro", (req, res) => {
  const dados = fs.readFileSync("usuarios.json", "utf8");
  const usuarios = JSON.parse(dados);
  usuarios.push(req.body);
  fs.writeFileSync("usuarios.json", JSON.stringify(usuarios));

  res.json({ message: "ok" });
});

app.post("/login", (req, res) => {
  const dados = fs.readFileSync("usuarios.json", "utf8");
  const usuarios = JSON.parse(dados);
  const usuarioEncontrado = usuarios.find(function (u) {
    return u.usuario === req.body.usuario && u.senha === req.body.senha;
  });
  if (usuarioEncontrado) {
    res.json({ message: "Usuário autenticado com sucesso" });
  } else {
    res.status(401).json({ message: "Usuário ou senha inválidos" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
