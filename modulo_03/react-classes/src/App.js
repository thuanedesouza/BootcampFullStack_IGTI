import React, { Component } from 'react';
import { getNewTimeStamp } from './helpers/dateTimeHelpers';

export default class App extends Component {
  constructor(){
    super();

    this.state = {
      clickArray: []
    }
  }

  componentDidUpdate(){
    document.title = this.state.clickArray.length.toString();
  }

  handleClick =  () => {
    const newClickArray = Object.assign([], this.state.clickArray);  
    newClickArray.push(getNewTimeStamp());

    this.setState({ clickArray: newClickArray})
  }

  render(){
    const {clickArray} = this.state;
  return  (
    <div>
      <h1> React e <em> Class Components</em></h1>
      <h3> React é sempre <em> performático</em></h3>
      <button onClick = {this.handleClick}>Clique aqui</button>

      <ul>
        {clickArray.map((item)=>{
          return <li key = {item}>{item}</li>
        }) }
      </ul>

    </div>
   )
  }
}
