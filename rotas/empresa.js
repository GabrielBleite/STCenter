var validacao = require('../validacao');
var schemas = require('../schemas');
var moment = require("moment");

function EmpresaCadastro(req, res) {
  validacao.empresa.validaEmpresaCadastro(req.body, function (err, results) {
    if(err){
      res.send({
        err: err,
        results: results
      });
    } else {
      var Schema = schemas.empresa();
      Schema.cnpj = req.body.cnpj;
      Schema.nome_fantasia = req.body.nome_fantasia;
      Schema.razao_social = req.body.razao_social;
      Schema.inscricao_estadual = req.body.inscricao_estadual;
      Schema.telefones.push(req.body.telefones);
      Schema.responsaveis.push(req.body.responsaveis);
      Schema.endereco = req.body.endereco;
      Schema.site = req.body.site;
      Schema.dataInicioVigencia = moment(req.body.dataInicioVigencia).format('YYYY-MM-DD HH:mm:ss.sssZ');
      Schema.dataFimVigencia = moment(req.body.dataFimVigencia).format('YYYY-MM-DD HH:mm:ss.sssZ');
      Schema.save(function (err, results) {
        res.send({
          err: err,
          results: results
        });
      });
    }
  });
}

module.exports = {
  EmpresaCadastro: EmpresaCadastro
}
