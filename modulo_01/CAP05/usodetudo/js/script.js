//variáveis de estado da aplicação
let tabCountries = null;
let tabFavorites = null;

let allCountries = [];
let favoriteCountries = [];

let countCountries = 0;
let countFavorites = 0;

let totalPopulationList = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;

window.addEventListener('load', () => {
  tabCountries = document.querySelector('#tabCountries');
  tabFavorites = document.querySelector('#tabFavorites');
  countCountries = document.querySelector('#countCountries');
  countFavorites = document.querySelector('#countFavorites');

  totalPopulationList = document.querySelector('#totalPopulationList');
  totalPopulationFavorites = document.querySelector('#totalPopulationFavorites');
  numberFormat = Intl.NumberFormat('pt-BR');
  fetchCountries();

});

async function fetchCountries() {
  //console.log('fetching...')
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const json = await res.json();
  allCountries = json.map(country => {
    const { numericCode, translations, population, flag } = country;
    return {
      id: numericCode,
      name: translations.pt,
      population,
      formattedPopulation: formatNumber(population),
      flag
    };
  });
  render();

}

// boas práticas: aplicar render com invocação de funções menores
function render() {
  //console.log('rendering...');
  renderCountryList();
  renderFavorites();
  renderSummary();
  handleCountryButtons();
}


//renderizando a lista de países com template literals
function renderCountryList() {
  //console.log('rendering...');
  let countriesHTML = "<div>";
  allCountries.forEach(country => {
    const { name, flag, id, population, formattedPopulation } = country;
    const contryHTML = `
    <div class = "country">
      <div>
      <a  id= "${ id}"class = "waves-effect waves-light btn" > +</a >
      </div >
      <div>
      <img src = "${flag}" alt = "Bandeira do país ${name}">
      </div>
      <div>
        <ul>
        <li>"${name}"</li>
        <li>"${formattedPopulation}"</li> 
        </ul>
      </div>
    </div > `;

    countriesHTML += contryHTML;
  })
  countriesHTML += "</div>";
  tabCountries.innerHTML = countriesHTML;
}

//renderizando a lista de países favoritos com template literals
function renderFavorites() {
  favoritesHTML = "<div>";
  favoriteCountries.forEach(country => {
    const { name, flag, id, population, formattedPopulation } = country;
    const favoriteCountryHTML = `
    <div class = "country">
      <div>
      <a  id= "${id}"class = "waves-effect waves-light btn" > +</a >
      </div >
      <div>
      <img src = "${flag}" alt = "Bandeira do país ${name}">
      </div>
      <div>
        <ul>
        <li>"${name}"</li>
        <li>"${formattedPopulation}"</li> 
        </ul>
      </div>
    </div > `;

    favoritesHTML += favoriteCountryHTML;

  });

  favoritesHTML += "</div>";
  tabFavorites.innerHTML = favoritesHTML;

}

//render summary com reduce
function renderSummary() {
  countCountries.textContent = allCountries.length;
  countFavorites.textContent = favoriteCountries.length; 3

  const totalPopulation = allCountries.reduce((accumulator, current) => {
    return accumulator + current.population;

  }, 0);

  const allPopulationFavorites = favoriteCountries.reduce((accumulator, current) => {
    return accumulator + current.population;
  }, 0);

  totalPopulationFavorites.textContent = formatNumber(allPopulationFavorites);
  totalPopulationList.textContent = formatNumber(totalPopulation);
}
//adicionando listener nos botões
function handleCountryButtons() {
  const countryButtons = Array.from(tabCountries.querySelectorAll('.btn'));
  const favoriteButtons = Array.from(tabFavorites.querySelectorAll('.btn'));

  countryButtons.forEach(button => {
    button.addEventListener('click', () => addToFavorites(button.id))
  });
  favoriteButtons.forEach(button => {
    button.addEventListener('click', () => removeFromFavorites(button.id))
  });
}

function addToFavorites(id) {
  const countryToAdd = allCountries.find(country => country.id === id);

  favoriteCountries = [...favoriteCountries, countryToAdd];
  favoriteCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  allCountries = allCountries.filter(country => country.id !== id);
  render();
}

function removeFromFavorites(id) {
  const countryToRemove = favoriteCountries.find(country => country.id === id);

  allCountries = [...allCountries, countryToRemove];
  allCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  favoriteCountries = favoriteCountries.filter(country => country.id !== id);
  render();
}

function formatNumber(number) {
  return numberFormat.format(number);

}