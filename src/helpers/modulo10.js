const strrev = require("../helpers/strrev");

function modulo10(bloco, callback) {
  let tamanhoBloco = bloco.length - 1;

  let codigo = bloco.substr(0, tamanhoBloco);

  codigo = strrev(codigo);
  codigo = codigo.split("");

  let somatorio = 0;

  codigo.forEach(function (value, index) {
    let soma = value * (index % 2 == 0 ? 2 : 1);

    /**
     * Quando a soma tiver mais de 1 algarismo(ou seja, maior que 9),
     * soma-se os algarismos antes de somar com somatorio
     */
    if (soma > 9) {
      somatorio += soma
        .toString()
        .split("")
        .reduce(function (sum, current) {
          return parseInt(sum) + parseInt(current);
        });
    } else {
      somatorio += soma;
    }

    if (codigo.length == index + 1) {
      /**
       * (Math.ceil(somatorio / 10) * 10) pega a dezena imediatamente superior ao somatorio
       * (dezena superior de 25 é 30, a de 43 é 50...).
       */
      let dezenaSuperiorSomatorioMenosSomatorio =
        Math.ceil(somatorio / 10) * 10 - somatorio;

      callback(dezenaSuperiorSomatorioMenosSomatorio);
    }
  });
}

module.exports = modulo10;
