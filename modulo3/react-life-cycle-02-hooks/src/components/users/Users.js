import React, { useState, useEffect } from 'react'
import User from './User';

export default function Users ({users}) {
   const [secondsVisible, setSecondsVisible] = useState(0);
   
   useEffect(() => {
       const interval = setInterval(()=>{
        setSecondsVisible(secondsVisible + 1); 
       }, 1000);
    
       return () => {
        clearInterval(interval)
       }
   }, [secondsVisible])


    // componentDidMount(){
    //   this.interval = setInterval(()=>{
    //     const {secondsVisible} = this.state;  
    //     this.setState({
    //           secondsVisible: secondsVisible + 1
    //       })
    //   },1000);
    // }

    // componentWillUnmount(){
    //     clearInterval(this.interval);     
    // }



       
        return (
            <div>
                <p>Component Users visível por {secondsVisible} segundos</p>
                <ul>
                {users.map(user=>{
                     const {login} = user;
                     return <li key = {login.uuid}>
                        <User user = {user}/></li>
                
                })}
                </ul>
                     
            </div>
        )   
}
