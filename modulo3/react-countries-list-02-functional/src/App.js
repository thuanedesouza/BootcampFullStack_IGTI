import React, { Component } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';

export default class App extends Component {
constructor(){
  super();
  this.state = {
    allCountries: [],
    filteredCountries: [],
    filter:'',
    filteredPopulation: 0
  }
}

async componentDidMount (){

  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const json = await res.json();
  
  const allCountries = json.map(({name, numericCode, flag, population})=>{
    return{
      id: numericCode,
      name,
      filterName: name.toLowerCase(),
      flag,
      population
    };
  });
  
  this.setState({
    allCountries,
    filteredCountries: Object.assign([], allCountries), //criar uma cópia nesses casos evita bugs
    filteredPopulation: this.calculateTotalPopulation(allCountries)
  });
}

calculateTotalPopulation = (countries) =>{
  const totalPopulation = countries.reduce((accumulator, current) => {
    return accumulator + current.population;
  },0)
  return totalPopulation;
};

handleChangeFilter = (newText)=>{
  this.setState({
    filter:newText
  })

  const filterLowerCase = newText.toLowerCase();
    const filteredCountries = this.state.allCountries.filter((country) =>{
      return country.filterName.includes(filterLowerCase);

    });

    const filteredPopulation = this.calculateTotalPopulation(filteredCountries);

    this.setState ({
    filteredCountries,
    filteredPopulation
  })
}

  render() {
    const {filteredCountries, filter, filteredPopulation} = this.state;
    return  <div className = "container">    
            <h1>React Countries</h1>
            <Header filter ={filter} onChangeFilter = {this.handleChangeFilter} 
            countryCount = {filteredCountries.length} totalPopulation ={filteredPopulation}/>
            <Countries countries = {filteredCountries} />
          </div>  
  }
}
