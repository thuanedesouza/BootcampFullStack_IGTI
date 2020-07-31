//criando uma biblioteca, exemplo.

function soma(a, b) {
  return a + b;
}

function subtracao(a, b) {
  return a - b;
}
//exportando no formato common.js
//exportacao default
module.exports = { soma, subtracao };

