//manipulando a DOM

var tittle = document.querySelector('h1');
tittle.textContent = 'Trocando título';

var city = document.querySelector('#city');
city.textContent = 'Nova Cidade';

var personalDataArray = document.querySelector('.personal-data');
console.log(personalDataArray);

//obs: é possivel alterar o css in js mas nao é boas práticas
var data = Array.from(document.querySelectorAll('.data'));
for (var i = 0; i < data.length; i++) {
  var currentElement = data[i];
  currentElement.classList.add('emphasis');
}
