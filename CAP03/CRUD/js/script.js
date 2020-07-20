

window.addEventListener('load', start);
// usando global para facilitar a visualização porque o foco da aula é o crud
var globalNames = ['Um', 'Dois', 'Três', 'Quatro'];
var inputName = null;
var currentIndex = null;
var isEditing = false;//boas práticas para variaveis booleanas: começar com is "estou editando?"

function start() {
  inputName = document.querySelector('#inputName');// lembrete: pegar referencia antes de usar
  preventFormSubmit();
  activateInput();
  render();
}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }
  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}


function activateInput() {
  function insertName(newName) {
    globalNames.push(newName);
  }

  function updateName(newName) {
    globalNames[currentIndex] = newName;
  }

  function handleTyping(event) {
    if (event.key === 'Enter' && event.target.value == false) {
      return;
    }
    if (event.key === 'Enter') {
      if (isEditing) {

        updateName(event.target.value);
      } else {
        insertName(event.target.value);

      }
      render();
      isEditing = false;
      clearInput();
    }
  }
  //escutar o evento de digitação pra torná-lo reativo
  inputName.addEventListener('keyup', handleTyping);
  // uma função para o seletor do mouse já estar no form
  inputName.focus();
}

function render() {
  function createDeleteButton(index) {
    function deleteName() {
      console.log(index);
      globalNames.splice(index, 1);
      // toda vez que a gente mexer no  vetor globalNames tem que renderizar denovo 
      render();
    }
    var button = document.createElement('button');
    button.classList.add('deleteButton');
    button.textContent = 'x';

    button.addEventListener('click', deleteName);
    return button;
  }

  function createSpan(name, index) {
    function editItem() {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }
    var span = document.createElement('span');
    span.textContent = name;

    //tornando o span clicável para edição
    span.classList.add('clickable');
    span.addEventListener('click', editItem)
    return span;
  }

  var divNames = document.querySelector('#names');
  divNames.innerHTML = '';
  //criar ul
  //fazer n lis conforme tamanho do vetor globalNames
  var ul = document.createElement('ul');

  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];

    var li = document.createElement('li');
    var button = createDeleteButton(i);
    var span = createSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }

  divNames.appendChild(ul);
  clearInput();
}

function clearInput() {
  inputName.value = '';
  inputName.focus();
}
