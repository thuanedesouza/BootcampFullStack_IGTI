import React from 'react'

export default function Value(props) {
    const handleValueChange = (event)=>{
        props.onValueChange(event) 
    }
    return (
     
            <div style = {styles.input}>    
            <label className = "active">
                Valor do Investimento:
            </label>

            <input id = 'investmentValue'
            type = 'number' 
            min="100" 
            step = "100" 
            max="9999999999999"
            onChange = {handleValueChange }/>
            </div>
     
    )
}


const styles = {

    input: {
        padding: '10px',
        width: '100%'

    }
}
