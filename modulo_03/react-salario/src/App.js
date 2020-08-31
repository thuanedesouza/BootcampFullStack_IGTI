import React, { Component} from 'react';
import InputSalary from './components/salary/InputSalary';
import {calculateSalaryFrom} from '../src/helpers/salary'
import Calculo from './components/salary/Calculo';

export default class App extends Component {

  constructor(){
    super();

    this.state = {
      fullSalary: 1000
    };
  }


    handleChangeSalary = (fullSalary) =>{
      this.setState({
        fullSalary
      });
    }
  
    render() {
      const {fullSalary} = this.state;
      const salaryObject = calculateSalaryFrom(fullSalary);

      return (<div className = "container">
              <h1>React Salário</h1>
              <InputSalary handleInputChange = {this.handleChangeSalary} salary = {fullSalary} 
              />
              <Calculo calculateSalaryFrom = {salaryObject}/>
            </div>);
  }
}
