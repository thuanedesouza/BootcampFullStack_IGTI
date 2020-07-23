window.addEventListener('load', () => {

  // console.log(divisionPromise(5, 1));
  // console.log(divisionPromise(5, 0));
  // console.log(divisionPromise(5, 6));
  // divisionPromise(12, 6).then(result => console.log(result));
  // divisionPromise(12, 0).then(result => console.log(result))
  //.catch(errorMessage => { console.log('Falha na divisão! ' + errorMessage); });
  //doFetch();
  doFetchAsync();
  //executeDivisionPromise();
  executeDivisionPromiseAsyncAwait();

})

function doFetch() {
  const rrgomide = fetch('https://api.github.com/users/rrgomide').then(res => {
    res.json().then(data => {
      showData(data);
    });
  }).catch(error => {
    console.log('Erro na requisição');
  });
}

async function doFetchAsync() {
  const res = await fetch('https://api.github.com/users/rrgomide');
  const data = await res.json();
  console.log(data);
}

function showData(data) {
  const user = document.querySelector('#user');
  user.textContent = data.login + ' ' + data.name;
}

function divisionPromise(a, b) {
  return new Promise((resolve, reject) => {
    if (b == 0) {
      reject('Não é possível dividir por 0');
    }
    resolve(a / b);
  })
}

function executeDivisionPromise() {
  divisionPromise(12, 2)
    .then(result => console.log(result))
    .catch(errorMessage => {
      console.log('Falha na divisão! ' + errorMessage);
    });
}

async function executeDivisionPromiseAsyncAwait() {
  const division = await divisionPromise(12, 2);
  console.log(division);
}