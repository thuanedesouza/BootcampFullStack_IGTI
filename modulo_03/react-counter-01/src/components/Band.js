import React, { Component } from 'react'

export default class Band extends Component {
    constructor(){
        super();
        this.state = {
            bandName: 'Billie Eilish',
            bandMembers: [
                {
                    id: 1,
                    name: 'Billie',
                    instrument: 'All'

                },
                {
                    id: 1,
                    name: 'Fineas',
                    instrument: 'All'

                },
            ]
        }
    }
    render() {
        const {bandName, bandMembers} = this.state

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
                  })};
            </ul>
            </div>
        );
    }
}
