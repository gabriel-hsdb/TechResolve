'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Chamado extends Model {
    static associate(models) {
    }
  }

  Chamado.init({
    nome: DataTypes.STRING,
    equipamento: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Chamado',
    timestamps: false
  });

  return Chamado;
};