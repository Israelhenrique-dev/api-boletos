const strrev = require("../helpers/strrev");

function modulo11(bloco, callback) {
  const tamanhoBloco = bloco.length - 1;
  let dezenaSuperiorSomatorioMenosSomatorio;

  let codigo = bloco.substr(0, tamanhoBloco);

  codigo = strrev(codigo);
  codigo = codigo.split("");

  let somatorio = 0;

  codigo.forEach(function (value, index) {
    somatorio += value * (2 + (index >= 8 ? index - 8 : index));

    if (codigo.length == index + 1) {
      let restoDivisao = somatorio % 11;

      if (restoDivisao == 0 || restoDivisao == 1) {
        dezenaSuperiorSomatorioMenosSomatorio = 0;
      } else if (restoDivisao == 10) {
        dezenaSuperiorSomatorioMenosSomatorio = 1;
      } else {
        dezenaSuperiorSomatorioMenosSomatorio =
          Math.ceil(somatorio / 11) * 11 - somatorio;
      }

      callback(dezenaSuperiorSomatorioMenosSomatorio);
    }
  });
}

module.exports = modulo11;
