import React, { Component } from 'react'
import User from './User';

export default class Users extends Component {
    constructor(){
        super();
        this.state = {
        secondsVisible:0       
        }
        this.interval = null;
    }
    componentDidMount(){
      this.interval = setInterval(()=>{
        const {secondsVisible} = this.state;  
        this.setState({
              secondsVisible: secondsVisible + 1
          })
      },1000);
    }

    componentDidUpdate(){
        console.log('compontentDidUpdate de  Users-js');
    }
    componentWillUnmount(){
        clearInterval(this.interval);
        // Para não dar erro de memory leak Warning: Can't perform a React state update on an unmounted component. 
        // This is a no-op, but it indicates a memory leak in your application. To fix,
        // cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
        console.log('compontentWillUnmount de  Users-js');
    }
    render() {
        const {users} = this.props;
        const {secondsVisible} = this.state;
        return (
            <div>
                <p>Component Users visível por {secondsVisible} segundos</p>
                <ul>
                {users.map(user=>{
                     const {login, name, picture} = user;
                     return <li key = {login.uuid}>
                        <User user = {user}/></li>
                
                })}
                </ul>
                     
            </div>
        )
    }
}
