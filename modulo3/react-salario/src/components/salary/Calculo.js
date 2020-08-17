import React, { Component } from 'react'
import css from './salary.module.css'

export default class Calculo extends Component {
   

    render() {
    
        const {calculateSalaryFrom} = this.props;
        
        return (
            <div className = {css.calculos}>
                <label>Base INSS</label>
                {calculateSalaryFrom.baseINSS} 
                
                <label>Desconto INSS</label>
                {calculateSalaryFrom.discountINSS}
                
                <label>Base IRPF</label>
                {calculateSalaryFrom.baseIRPF}
                
                <label>Desconto IRPF</label>
                {calculateSalaryFrom.discountIRPF}

                <label>Salário Líquido</label>
                {calculateSalaryFrom.netSalary}
            </div>
        )
    }
}
