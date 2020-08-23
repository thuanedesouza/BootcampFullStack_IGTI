import React, { useState, useEffect } from 'react';

import Countries from './components/countries/Countries';
import Header from './components/header/Header';

export default function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filteredPopulation, setFilteredPopulation] = useState(0);
  const [userFilter, setUserFilter] = useState('');

  useEffect(() => {
    const getCountries = async () => {
      const res = await fetch('https://restcountries.eu/rest/v2/all');
      let allCountries = await res.json();
      allCountries = allCountries.map(({ name, numericCode, flag, population }) => {
        return {
          id: numericCode,
          name,
          filterName: name.toLowerCase(),
          flag,
          population
        }
      });

      setAllCountries(allCountries);
      setFilteredCountries(Object.assign([], allCountries));
    }
    getCountries();

  }, []);


  const calculateTotalPopulation = (countries) => {
    const totalPopulation = countries.reduce((accumulator, current) => {
      return accumulator + current.population;
    }, 0)
    return totalPopulation;
  };

  const handleChangeFilter = (newText) => {
    setUserFilter(newText);

    const filterLowerCase = newText.toLowerCase();

    const filteredCountries = allCountries.filter((country) => {
      return country.filterName.includes(filterLowerCase);

    });

    const filteredPopulation = calculateTotalPopulation(filteredCountries);

    setFilteredCountries(filteredCountries);
    setFilteredPopulation(filteredPopulation);
  }

  return (
    <div className="container">
      <h1>React Countries</h1>
      <Header filter={userFilter} onChangeFilter={handleChangeFilter}
        countryCount={filteredCountries.length} totalPopulation={filteredPopulation} />
      <Countries countries={filteredCountries} />
    </div>
  );

}
