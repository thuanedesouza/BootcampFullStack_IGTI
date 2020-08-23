import React from 'react'

export default function Action({type, id, onActionClick}) {

    const handlconClick = ()=>{
        onActionClick(id, type)

    }
    return (
        <span className = "material-icons" onClick = {handlconClick} style = {{cursor: 'pointer'}}> 
        {type}
        </span>
    )
}
