//console.log('Olá, mundo!');

//var title = document.querySelector('h1');
//title.textContent = 'Modificado por Thuane de Souza';

//revisão
var dia = 1;
if (dia === 1) {
  console.log('Domingo');
} else {
  if (dia === 2) {
    console.log('Segunda');
  } else {
    if (dia === 3) {
      console.log('Terça');
    } else {
      if (dia === 4) {
        console.log('Terça');
      }
    }
  }
}
// parando aqui para usar o switch
var r = '';
switch (dia) {
  case 1:
    r = 'Domingo';
    break;
  case 2:
    r = 'Segunda';
    break;
  case 3:
    r = 'Terça';
    break;
  case 4:
    r = 'Quarta';
    break;
  case 5:
    r = 'Quinta';
    break;
  case 6:
    r = 'Sexta';
    break;
  case 7:
    r = 'Sabado';
    break;
}
console.log(r);

//operador ternario
a = 6;
b = 7;
var resposta = a > b ? 'Maior' : a < b ? 'Menor' : 'Igual';
console.log(resposta);
//obs: não recomendado no dia a dia mas é um bom exercicio
var diaSemana =
  dia === 1
    ? 'Domingo'
    : dia === 2
    ? 'Segunda'
    : dia === 3
    ? 'Terça'
    : dia === 4
    ? 'Terça'
    : 'Outro dia';
console.log(diaSemana);

//somatorio
function superSum(from, upTo) {
  var sum = 0;
  for (var i = from; i < upTo; i++) {
    sum += i;
  }
  return sum;
}

console.log(superSum(1, 5));
