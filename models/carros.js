const database = require("../database");
const Sequelize = require("sequelize");

const Carros = database.define("carros", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  marca: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ano: {
    type: Sequelize.INTEGER,
    allowNull: false
  },  
  imagem: {
    type: Sequelize.STRING,
    allowNull: false
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: false
  }
},
{ freezeTableName: true,  
  timestamps: false,   
  createdAt: false,  
  updatedAt: false,
});

module.exports = Carros;