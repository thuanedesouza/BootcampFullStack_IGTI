import { promises as fs } from "fs";
import { stringify } from "querystring";

cidadesPorEstado();
fiveStatesWithMoreCities();
fiveStatesWithLessCities();
biggerCityNameOfStates();
smallerCityNameOfStates();
console.log("A quantidade de cidade de minas é", quantityOfCities('AC'));

//Criar uma função que irá criar um arquivo JSON para cada estado representado no arquivo
async function cidadesPorEstado() {
  try {
    const dataCities = JSON.parse(await fs.readFile("Cidades.json"));
    const dataStates = JSON.parse(await fs.readFile("Estados.json"));

    for (let i = 1; i <= dataStates.length; i++) {
      let thisStateCities = [];
      dataCities.forEach(cidade => {
        if (parseInt(cidade.Estado) === i) {
          thisStateCities.push(cidade.Nome);
        }
      });
      await fs.writeFile(`${dataStates[i - 1].Sigla}.json`, JSON.stringify(thisStateCities));
    }

  } catch (err) {
    console.log(err);
  }
}
/*Criar uma função que recebe como parâmetro o UF do estado, 
realize a leitura do arquivo JSON correspondente e retorne a quantidade de cidades daquele estado.*/
async function quantityOfCities(initials) {
  try {
    const arrayCities = JSON.parse(await fs.readFile(`${initials}.json`))
    return arrayCities.length;
  } catch (err) {
    console.log(err);
  }
}

//Criar um método que imprima no console um array com o UF dos cinco estados que mais possuem cidades
async function fiveStatesWithMoreCities() {
  try {
    const dataStates = JSON.parse(await fs.readFile("Estados.json"));
    const arrayStateAndNumberOfCIties = [];
    for (let state of dataStates) {// forEach não espera as promises
      const nCities = await quantityOfCities(state.Sigla);
      arrayStateAndNumberOfCIties.push({ UF: `${state.Sigla}`, nCities: `${nCities}` });
    };
    arrayStateAndNumberOfCIties.sort((a, b) => {
      return b.nCities - a.nCities;
    })
    for (let i = 0; i < 5; i++) {
      console.log(arrayStateAndNumberOfCIties[i]);
    }
  } catch (err) {
    console.log(err);
  }
}

//Criar um método que imprima no console um array com o UF dos cinco estados 
//que menos possuem cidades, seguidos da quantidade, em ordem decrescente

async function fiveStatesWithLessCities() {
  try {
    const dataStates = JSON.parse(await fs.readFile("Estados.json"));
    const arrayStateAndNumberOfCIties = [];
    for (let state of dataStates) {// forEach não espera as promises
      const nCities = await quantityOfCities(state.Sigla);
      arrayStateAndNumberOfCIties.push({ UF: `${state.Sigla}`, nCities: `${nCities}` });
    };
    arrayStateAndNumberOfCIties.sort((a, b) => {
      return a.nCities - b.nCities;
    })

    let fiveStatesWithLessCities = [];
    for (let i = 0; i < 5; i++) {
      fiveStatesWithLessCities.push(arrayStateAndNumberOfCIties[i]);
    }
    fiveStatesWithLessCities.sort((a, b) => {
      return b.nCities - a.nCities;
    })
    console.log(fiveStatesWithLessCities);
  } catch (err) {
    console.log(err);
  }
}

//Criar um método que imprima no console um array com a cidade 
//de maior nome de cada estado, seguida de seu UF
async function biggerCityName(initials) {
  try {
    const arrayCities = JSON.parse(await fs.readFile(`${initials}.json`))
    arrayCities.sort((a, b) => {
      return b.length - a.length;
    });

    return arrayCities[0];
  } catch (err) {
    console.log(err);
  }
}

async function biggerCityNameOfStates() {
  try {
    const dataStates = JSON.parse(await fs.readFile("Estados.json"));
    let arrayBiggerCityNameOfStates = [];
    let biggerName = '';
    for (let state of dataStates) {
      biggerName = await biggerCityName(state.Sigla);
      arrayBiggerCityNameOfStates.push({ City: `${biggerName}`, UF: `${state.Sigla}` });
    }
    console.log(arrayBiggerCityNameOfStates);
    BiggerNameCityOfAll(arrayBiggerCityNameOfStates);
  } catch (err) {
    console.log(err);
  }
}

async function smallerCityName(initials) {
  try {
    const arrayCities = JSON.parse(await fs.readFile(`${initials}.json`))
    arrayCities.sort((a, b) => {
      return a.length - b.length;
    });
    return arrayCities[0];
  } catch (err) {
    console.log(err);
  }
}

async function smallerCityNameOfStates() {
  try {
    const dataStates = JSON.parse(await fs.readFile("Estados.json"));
    let arraySmallerCityNameOfStates = [];
    let smallerName = '';
    for (let state of dataStates) {
      smallerName = await smallerCityName(state.Sigla);
      arraySmallerCityNameOfStates.push({ City: `${smallerName}`, UF: `${state.Sigla}` });
    }
    console.log(arraySmallerCityNameOfStates);
    smallerNameCityOfAll(arraySmallerCityNameOfStates);
  } catch (err) {
    console.log(err);
  }
}

//Criar um método que imprima no console a cidade de maior nome entre todos os estados
function BiggerNameCityOfAll(array) {
  array.sort((a, b) => {
    return b.City.length - a.City.length;
  });
  console.log(`A cidade com maior nome do Brasil:  ${array[0].City}`);
  console.log('array com cidades de MAIOR nome em ordem alfabetica', array)
}
//Criar um método que imprima no console a cidade de menor nome entre todos os estados,
function smallerNameCityOfAll(array) {
  array.sort((a, b) => {
    return a.City.length - b.City.length;
  });
  console.log(`A cidade com menor nome do Brasil:  ${array[0].City}`);
  console.log('array com cidades de MENOR nome em ordem alfabetica', array)
}