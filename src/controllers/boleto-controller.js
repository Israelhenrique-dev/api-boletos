const unexpectedError = require("../errors/unexpected-error");
const boletoService = require("../services/boleto-service");

class BoletoController {
  get(req, res) {
    try {
      boletoService.get(req, res);
    } catch (error) {
      unexpectedError(res);
    }
  }
}

module.exports = new BoletoController();
