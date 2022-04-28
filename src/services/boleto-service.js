const errorBoletoBancario = require("../errors/boleto-bancario-error");
const errorBoletoConvenio = require("../errors/boleto-convenio-error");
const unexpectedError = require("../errors/unexpected-error");
const boletoBancario = require("../helpers/boleto-bancario");
const boletoConvenio = require("../helpers/boleto-convenio");
const clearMask = require("../helpers/remove-mask-helper");
const boletoMock = require("../mocks/boleto-mock");

class BoletoService {
  get(req, res) {
    try {
      const barCode = clearMask(req.params.barCode);

      if (Number(req.params.barCode[0]) === 8) {
        return boletoConvenio(req.params.barCode, (err, isValid) => {
          if (err || !isValid) {
            errorBoletoConvenio(res);
          } else {
            const boleto = boletoMock.filter((boleto) => {
              return boleto.barcode === barCode;
            });

            return res.json(boleto[0]);
          }
        });
      } else {
        return boletoBancario(req.params.barCode, (err, isValid) => {
          if (err || !isValid) {
            errorBoletoBancario(res);
          } else {
            const boleto = boletoMock.filter((boleto) => {
              return boleto.barcode === barCode;
            });

            return res.json(boleto[0]);
          }
        });
      }
    } catch (error) {
      return unexpectedError(res);
    }
  }
}

module.exports = new BoletoService();
