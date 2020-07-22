'use strict'; // faz o JavaScript acusar mais erros

function withVar() {
  for (var i = 0; i < 10; i++) {
    console.log('var' + i);
  }
  i = 20;
  console.log(i)
}

function withLet() {
  for (let i = 0; i < 10; i++) {
    console.log('let' + i);
  }
  //i = 20;//erro, i só pertence ao escopo de for
  //console.log(i)
}

withVar();
withLet();

const d = [];
//d = 1; erro
d.push(1); // isso é possível, const nao é imutavel com array
console.log(d)

function sum1(a, b) {
  return a + b;
}

const sum2 = function (a, b) {
  //função anonima
  return a + b
}

//arrow function
const sum3 = (a, b) => { return a + b };

//arrow function reduzida
const sum4 = (a, b) => a + b;

console.log(sum1(2, 3));
console.log(sum2(2, 3));
console.log(sum3(2, 3));
console.log(sum4(2, 3));


const name = ' Thuane';
const surname = ' de Souza';
const text1 = 'Meu nome é' + name + surname;

//template literals
const text2 = `Meu nome é ${name} ${surname}`;

console.log(text1)
console.log(text2);

//default parameters
const sum5 = (a, b = 12) => a + b;
console.log(sum5());//numero + undefined = NaN
console.log(sum5(3, 2)); // ok
console.log(sum5(1)); // ok
