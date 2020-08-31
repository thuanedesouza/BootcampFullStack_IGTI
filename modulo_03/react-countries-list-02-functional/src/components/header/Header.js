import React from 'react'
import { formatNumber } from '../../helpers/formatHelpers';
import css from '../header/header.module.css'


export default function Header(props) {
    const handleInputChange = (event) =>{
        const newText = event.target.value; 
        props.onChangeFilter(newText);
    }
    
        const {filter, countryCount, totalPopulation} = props
        return (
            <div className = {css.flexRow}>
               <input type = 'text' placeholder = 'Filtro' value ={filter} onChange = {handleInputChange}/>
                <span className = {css.countries}>|Paises: <strong>{countryCount}</strong> </span>
                <span className = {css.population}> |População: <strong>{formatNumber (totalPopulation)}</strong> </span> 
            </div>
        )
    }


