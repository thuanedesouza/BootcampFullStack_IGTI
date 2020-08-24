import React from 'react'

export default function PeriodInput(props) {
    const handlePeriodChange = (event)=>{
        props.onPeriodChange(event); 
    }
    return (
        <div>
            <div style = {styles.input}>
            <label className = "active">
             Período(meses):
            </label>

            <input id = 'rateValue'
            type = 'number' 
            min="1" 
            step = "1" 
            max="96"
            onChange = {handlePeriodChange }/>
            </div>
        </div>
    )
}

const styles = {

    input: {
        padding: '10px',
        width: '100%'

    }
}