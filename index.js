const express = require("express");
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const Carros = require("./models/carros");
var mensagem = "";
var index = 0;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const carros = await Carros.findAll();
  setTimeout(() => {
    mensagem = "";
  }, 3000);
    res.render("index", {carros,mensagem });
  });

app.get("/cadastrar", (req, res) => {
  res.render("cadastrar");
})

app.post("/cadastrar", async (req, res) => {
    const {nome, marca, ano, imagem, descricao } = req.body;
    const carros = await Carros.create({ 
      nome,
      marca, 
      ano,    
      imagem,
      descricao,
    });
    mensagem = `Parabéns ${nome}, foi cadastrado!!!`;
    res.redirect(`/`);
  });

app.get("/editar/:id", async (req, res) => {
    const carros = await Carros.findByPk(req.params.id);
      if (!carros) {
      res.render("editar", {mensagem: "Carro não encontrado!"});
    }  
    res.render("editar", {carros});
  });

app.post("/editar/:id", async (req, res) => {
    const carros = await Carros.findByPk(req.params.id);
    const { nome, marca, ano, imagem, descricao } = req.body;
    carros.nome = nome;
    carros.marca = marca;
    carros.ano = ano;
    carros.imagem = imagem;
    carros.descricao = descricao;
  
    const carrosEditado = await carros.save();
  
    mensagem = `Parabéns ${nome}, foi editado!!!`;
    res.redirect(`/`);    
  });
  

app.get("/deletar/:id", async (req, res) => {
    const carros = await Carros.findByPk(req.params.id);
    if (!carros) {
      res.render("deletar", {
        mensagem: "Carro não encontrado!",
      });
    }
    res.render("deletar", {
      carros,
    });
  });
  
  app.post("/deletar/:id", async (req, res) => {
    const carros = await Carros.findByPk(req.params.id);
  
    if (!carros) {
      res.render("deletar", {
        mensagem: "Carro não encontrado!",
      });
    }
    await carros.destroy();
    mensagem = `Carro ${carros.nome} deletado com sucesso!`;
    res.redirect(`/`);    
  });


app.get("/detalhes/:id", async (req, res) => {
  const carros = await Carros.findByPk(req.params.id);
  res.render("detalhes", { titulo: "DETALHES", carros });
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));