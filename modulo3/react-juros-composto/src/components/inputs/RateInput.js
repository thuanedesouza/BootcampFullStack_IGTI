import React from 'react'

export default function RateInput(props) {
    const handleRateChange = (event)=>{
        props.onRateChange(event) 
    }

    return (
        <div style = {styles.input}>
            <label className = "active">
             Juros Mensal:
            </label>

            <input id = 'rateValue'
            type = 'number' 
            min="-12" 
            step = "0.1" 
            max="12"
            onChange = {handleRateChange }/>
            </div>
    )
}

const styles = {

    input: {
        padding: '10px',
        width: '100%'

    }
}