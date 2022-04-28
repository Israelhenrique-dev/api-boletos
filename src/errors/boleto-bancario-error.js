function errorBoletoBancario(res) {
  return res.status(400).json({
    error: "Boleto de título bancário inválido.",
  });
}

module.exports = errorBoletoBancario;
