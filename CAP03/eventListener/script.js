console.log('aula 4');

window.addEventListener('load', start);
//arg 1: nome do evento
//arg 2: função que vai executar

function start() {
  console.log('Página totalmente carregada');
  var nameInput = document.querySelector('#nameInput');
  nameInput.addEventListener('keyup', countName);
  var form = document.querySelector('form');
  form.addEventListener('submit', preventSubmit);
}

function countName(event) {
  // aqui a gente ve o que recebemos no evento e procuramos algo para usar console.log(event);
  var count = event.target.value;
  var span = document.querySelector('#nameLength');
  span.textContent = count.length;
}

function preventSubmit(event) {
  event.preventDefault();
  var nameInput = document.querySelector('#nameInput');
  alert(nameInput.value + ' cadastrado com sucesso');
}
