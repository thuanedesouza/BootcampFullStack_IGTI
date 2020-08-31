import React from 'react'
export default function PortionsAsResult({calculatedObject}) {
    //const Object = Object([],calculatedObject);
    
    return (
                calculatedObject.map((object) =>{
                    const {total, month, balance, percent} = object
                    return(
                    <div key = {object.legth - 1} className="card">
                    <div><strong> {month}</strong> </div>
                    <div>{total}</div>

                    <div>{balance}</div>
                    <div>{percent}</div>
                    </div>  
                    );
                } )
              
      
    )
}
