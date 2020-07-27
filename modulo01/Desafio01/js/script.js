// 1. Na carga inicial da aplicação, obter os dados de: https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo
// 2. Carregar os dados dos usuários em um array.
// 3. Permitir a filtragem de usuários através de um input com interação do usuário.

// 4. O usuário poderá filtrar dados quando digitar pelo menos um caractere no input.
// 5. O usuário poderá filtrar os dados tanto digitando "Enter" quanto clicando no botão correspondente, conforme imagens mais abaixo.

// 6. Montar dois painéis.
// 7. No painel da esquerda, listar os usuários filtrados.
// 8. No painel da direita, calcular e mostrar algumas estatísticas sobre esses usuários, conforme imagens abaixo.
let tabUsersList = null;
let search = '';
let allUsers = [];
let isStringEqual = false;

window.addEventListener('load', () => {
  tabUsersList = document.querySelector('#tabUsers');
  doFetch();
  watchSubmit();
});

async function doFetch() {
  // 1. Na carga inicial da aplicação, obter os dados de: https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo
  // 2. Carregar os dados dos usuários em um array.
  const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
  const json = await res.json();
  // allUser é o array de usuários
  allUsers = json.results.map(user => {
    const { name, gender, dob, picture } = user;
    return {
      name: `${name.first} ${name.last}`,
      gender,
      age: dob.age,
      picture
    };
  });
}

function render() {
  renderUsersList();
}

function renderUsersList() {
  tabUsersList = '';
  let usersHTML = "<div>";
  allUsers.forEach(user => {
    const { name, gender, age, picture } = user;
    const userHTML = `
    <div class = "country">
      <div>
      <a  id= "${name}"class = "waves-effect waves-light btn" > +</a >
      </div >
      <div>
      <img src = "${picture}" alt = "Foto do usuário">
      </div>
      <div>
        <ul>
        <li>"${name}"</li>
        <li>"${gender}"</li
        <li>"${age}"</li>
        </ul>
      </div>
    </div > `;
    usersHTML += userHTML;
  })
  usersHTML += "<div>";
  tabUsersList.innerHTML = usersHTML;
}


function doSearch(search) {

  let usersFound = allUsers.filter(eachUser => {
    return eachUser.name.includes(search);
  });
  console.log(usersFound);
}

function watchSubmit() {
  var form = document.querySelector("form");
  let search = null;

  form.addEventListener('submit', (event) => {
    search = event.target[0].value;
    event.preventDefault();
    console.log(search);
    doSearch(search);
  })
}
// const clearInput = () => {
//   inputName.value = '';
//   inputName.focus();
// };



// 3. Permitir a filtragem de usuários através de um input com interação do usuário.

// 4. O usuário poderá filtrar dados quando digitar pelo menos um caractere no input.
// 5. O usuário poderá filtrar os dados tanto digitando "Enter" quanto clicando no botão correspondente, conforme imagens mais abaixo.




// 6. Montar dois painéis.
// 7. No painel da esquerda, listar os usuários filtrados.
// 8. No painel da direita, calcular e mostrar algumas estatísticas sobre esses usuários, conforme imagens abaixo.
