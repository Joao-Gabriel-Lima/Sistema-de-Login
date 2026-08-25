const fs = require("fs");

const express = require("express");
const app = express();

const bcrypt = require("bcrypt");

app.use(express.static("public"));

app.use(express.json());

app.post("/cadastro", (req, res) => {
  bcrypt.hash(req.body.senha, 10, function (err, hash) {
    const dados = fs.readFileSync("usuarios.json", "utf8");
    const usuarios = JSON.parse(dados);
    usuarios.push({ usuario: req.body.usuario, senha: hash });
    fs.writeFileSync("usuarios.json", JSON.stringify(usuarios));

    res.json({ message: "ok" });
  });
});

app.post("/login", (req, res) => {
  const dados = fs.readFileSync("usuarios.json", "utf8");
  const usuarios = JSON.parse(dados);
  const usuarioEncontrado = usuarios.find(function (u) {
    return u.usuario === req.body.usuario;
  });
  if (usuarioEncontrado) {
    bcrypt.compare(
      req.body.senha,
      usuarioEncontrado.senha,
      function (err, result) {
        if (result) {
          res.json({ message: "Usuário autenticado com sucesso" });
        } else {
          res.status(401).json({ message: "Usuário ou senha inválidos" });
        }
      },
    );
  } else {
    res.status(401).json({ message: "Usuário ou senha inválidos" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
