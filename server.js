var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var config = require('./config');
var rotas = require('./rotas');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//Rotas
app.get('/usuario', rotas.usuario.UsuarioBusca);
app.post('/usuario/cadastro', rotas.usuario.UsuarioCadastro);
app.post('/empresa/cadastro', rotas.empresa.EmpresaCadastro);

//Sobe o servidor e mostra a porta
app.listen(config.port, function () {
  console.log("Servidor na porta:  " + config.port);
});
