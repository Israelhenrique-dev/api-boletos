function errorBoletoConvenio(res) {
  return res.status(400).json({
    error: "Boleto de concessionária inválido.",
  });
}

module.exports = errorBoletoConvenio;
