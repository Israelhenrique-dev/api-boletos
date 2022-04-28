const express = require("express");
const BoletoController = require("./controllers/boleto-controller");

const routes = express.Router();

routes.get("/boleto/:barCode", BoletoController.get);

module.exports = routes;
