const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
var lista = [];
var mensagem = "";
var index = 0;



app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  setTimeout(() => {
    mensagem = "";
  }, 3000);
    res.render("index", { titulo: "Catálago",lista:lista,mensagem });
  });


app.get("/cadastrar", (req, res) => {
    res.render("cadastrar", { titulo: "Cadastro" });
  });

  app.post("/new", (req, res) => {
    const {nome, marca, ano, imagem, descricao } = req.body;
    lista.push({nome:nome,marca:marca,ano:ano,imagem:imagem,descricao:descricao,index:index});
    mensagem = `Parabéns ${nome}, foi cadastrado!!!`;
    index++;
    res.redirect(`/`);
  });
  app.get("/editar", (req, res) => {
    res.render("editar", { titulo: "Editar" });
  });
  app.get("/deletar", (req, res) => {
    res.render("deletar", { titulo: "Deletar" });
  });
  app.get("/detalhes/:id", (req, res) => {
    
    const id = req.params.id;
    res.render("detalhes", { titulo: "DETALHES",lista:lista,id:id});
     
   });
 



app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));