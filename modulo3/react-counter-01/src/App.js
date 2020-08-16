import React, { Component, Fragment } from 'react'
import Counter from './components/Counter/Counter'
import Counter2 from './components/Counter/Counter2'
import Band from './components/Band'
export default class App extends Component {
  constructor(){
    super();
    this.state = {
      currentCounter:3,
      steps:0
    }
  }

handleCount = (clickType)=>{
  const {currentCounter, steps} = this.state;
  
  this.setState({
    currentCounter:
      clickType === '+'? currentCounter + 1 : currentCounter - 1,  
      steps: steps + 1
    });

}

  render() {
    const {currentCounter, steps} = this.state;
     return (
    <Fragment>
      <h3>Band: Trabalhando com arrays com métodos do JS moderno para retornar JSX</h3>
      < Band/>
      <h3>Counter 1: Componentes de Estados individuais</h3>
      <Counter/>
      <Counter/>
      <h3>Counter 2: Componente de Estados compatilhados</h3>
      <Counter2 onCount = {this.handleCount} countValue = {currentCounter} currentStep = {steps}/>
      <Counter2 onCount = {this.handleCount} countValue = {currentCounter} currentStep = {steps} />

    </Fragment>
    );
  }
}
