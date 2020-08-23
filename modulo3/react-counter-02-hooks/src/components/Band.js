import React, { useState } from 'react'

const BAND_MEMBERS = [
    {
        id: 1,
        name: 'Billie',
        instrument: 'All'

    },
    {
        id: 1,
        name: 'Fineas',
        instrument: 'All'

    }
 ];


export default  function Band () {
   
  const [bandMembers, setBandMembers] =  useState(BAND_MEMBERS);
  const [bandName, setBandName] = useState('Billie Eilish');

        return (
            <div> 
              <h4>{bandName}</h4>
              <ul>
                  {bandMembers.map( ({id, name, instrument})=>{
                    return(  
                    <li key ={id}>
                          {name} - {instrument} 
                    </li>
                  );
                  })}
            </ul>
            </div>
        );
    }

