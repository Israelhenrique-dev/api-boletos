function unexpectedError(res) {
  return res.status(500).json({
    error: "Houve um erro inesperado",
  });
}

module.exports = unexpectedError;
