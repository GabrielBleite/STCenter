var validacao = require('../validacao');
var schemas = require('../schemas');
var moment = require("moment");

function UsuarioCadastro(req, res) {
  validacao.usuario.validaUsuarioCadastro(req.body, function (err, resultsV) {
    if (err) {
      res.send({
        err: err,
        results: resultsV
      });
    } else {
      schemas.empresa.findOne({
        cnpj: req.body.cnpj
      }, function (err, resultsE) {
        console.log(err, resultsE);
        if (err || !resultsE) {
          res.send({
            err: err,
            results: resultsE
          });
        } else {
          var Schema = schemas.usuario();
          Schema.id_empresa = resultsE._id ? resultsE._id : null;
          Schema.email = req.body.email;
          Schema.senha = req.body.senha;
          Schema.status = req.body.status;
          Schema.dataInicioVigencia = moment.format('YYYY-MM-DD HH:mm:ss.sssZ');
          Schema.dataFimVigencia = moment(req.body.dataFimVigencia).format('YYYY-MM-DD HH:mm:ss.sssZ');
          Schema.save(function (err, resultsS) {
            res.send({
              err: err,
              results: resultsS
            });
          });
        }
      });
    }
  });
}

function UsuarioBusca(req, res) {
  validacao.usuario.validaBuscaUsuario(req.query, function (err, results) {
    schemas.usuario.findOne({
      email: req.query.email,
      senha: req.query.senha
    }, function (err, results) {
      res.send({
        err: err,
        results: results
      });
    });
  });
}

module.exports = {
  UsuarioCadastro: UsuarioCadastro,
  UsuarioBusca: UsuarioBusca
}
