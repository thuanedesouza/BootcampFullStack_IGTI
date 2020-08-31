import operacoes from "./operacoes.js";
// no caso de exportação nomeada tem que falar exatamente o nome da função que vai usar
import { divisao, resto } from "./operacoesNomeadas.js";

console.log(operacoes.soma(2, 3));
console.log(operacoes.subtracao(5, 3));

import multiplicacao from "./operacoes2.js";
console.log(multiplicacao(2, 3));
console.log(divisao(10, 2), resto(7, 2));