const modulo10 = require("./modulo10");
const modulo11 = require("./modulo11");

function boletoConvenio(codigoBarras, callback) {
  codigoBarras = codigoBarras.replace(/( |-)/g, "");

  if (!/^[0-9]{48}$/.test(codigoBarras)) {
    return callback(new Error("Invalid format."), null);
  }

  let blocos = [];

  blocos[0] = codigoBarras.substr(0, 12);
  blocos[1] = codigoBarras.substr(12, 12);
  blocos[2] = codigoBarras.substr(24, 12);
  blocos[3] = codigoBarras.substr(36, 12);

  /**
   * Verifica se é o modulo 10 ou modulo 11.
   * Se o 3º digito for 6 ou 7 é modulo 10, se for 8 ou 9, então modulo 11.
   */
  let isModulo10 = ["6", "7"].indexOf(codigoBarras[2]) != -1;
  let valido = 0;

  blocos.forEach(function (bloco, index) {
    if (isModulo10) {
      modulo10(bloco, function (digitoVerificador) {
        if (digitoVerificador == bloco[bloco.length - 1]) valido++;
      });
    } else {
      modulo11(bloco, function (digitoVerificador) {
        if (digitoVerificador == bloco[bloco.length - 1]) valido++;
      });
    }

    if (blocos.length == index + 1) {
      return callback(null, valido == 4);
    }
  });
}

module.exports = boletoConvenio;
