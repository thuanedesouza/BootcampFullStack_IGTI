import React, { Component } from 'react'

export default class InputSalary extends Component {
    
     handleInputChange = (event) =>{
   
            this.props.handleInputChange(event.target.value);
     }        
    render() {
        return (
            <div>
                <label>Salário Bruto</label>
                <input type = 'number' placeholder = 'Valor' min="1000" step = "100" max="9999999999" 
                onChange = {this.handleInputChange }/> 
            </div>
        )
    }
}
