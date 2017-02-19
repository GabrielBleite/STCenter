var config = require('../config');
var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
Mongoose.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/STCenter');

function montaUsuario(){

  var UsuarioSchema = new Schema({
    id_empresa: Schema.Types.ObjectId,
    email: String,
    senha: String,
    status: String,
    dataInicioVigencia: Date,
    dataFimVigencia: { type:Date, default: null }
  });

  return Mongoose.model('Usuario', UsuarioSchema);
}

function montaEmpresa(){

  var EmpresaSchema = new Schema({
    cnpj: String,
    nome_fantasia: String,
    razao_social: String,
    inscricao_estadual: String,
    telefones: [String],
    responsaveis: [{ nome: String, cargo: String, telefone: String, email: String}],
    endereco: { cep: String, logradouro: String, numero: String, complemento: String, bairro: String, cidade: String, estado: String },
    site: String
  });

  return Mongoose.model('Empresa', EmpresaSchema);
}

module.exports = {
  usuario: montaUsuario(),
  empresa: montaEmpresa()
}
