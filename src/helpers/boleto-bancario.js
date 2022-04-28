const modulo10 = require("./modulo10");
const modulo11_2 = require("./modulo11_2");

function boletoBancario(linhaDigitavel, callback) {
  linhaDigitavel = linhaDigitavel.replace(/( |\.)/g, "");

  if (!/^[0-9]{47}$/.test(linhaDigitavel)) {
    return callback(new Error("Invalid format."), null);
  }

  let codigoBarras =
    linhaDigitavel.substr(0, 4) +
    linhaDigitavel.substr(32, 15) +
    linhaDigitavel.substr(4, 5) +
    linhaDigitavel.substr(10, 10) +
    linhaDigitavel.substr(21, 10);

  let blocos = [];

  blocos[0] = linhaDigitavel.substr(0, 10);
  blocos[1] = linhaDigitavel.substr(10, 11);
  blocos[2] = linhaDigitavel.substr(21, 11);

  let valido = 0;
  blocos.forEach(function (bloco, index) {
    modulo10(bloco, function (digitoVerificador) {
      if (digitoVerificador == bloco[bloco.length - 1]) valido++;
    });

    if (blocos.length == index + 1) {
      if (
        modulo11_2(codigoBarras.substr(0, 4) + codigoBarras.substr(5, 39)) !=
        codigoBarras.substr(4, 1)
      ) {
        return callback(null, false);
      }

      return callback(null, valido == 3);
    }
  });
}

module.exports = boletoBancario;
