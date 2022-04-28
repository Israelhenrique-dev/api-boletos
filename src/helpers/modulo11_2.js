function modulo11_2(bloco) {
  let numero = bloco;
  let soma = 0;
  let peso = 2;
  let base = 9;
  let resto = 0;
  let contador = numero.length - 1;

  for (let i = contador; i >= 0; i--) {
    soma = soma + numero.substring(i, i + 1) * peso;
    if (peso < base) {
      peso++;
    } else {
      peso = 2;
    }
  }
  let digito = 11 - (soma % 11);
  if (digito > 9) digito = 0;
  if (digito == 0) digito = 1;
  return digito;
}

module.exports = modulo11_2;
