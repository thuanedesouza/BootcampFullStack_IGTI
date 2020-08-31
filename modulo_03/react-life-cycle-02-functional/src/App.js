import React, { Component } from 'react';
import Users from './components/users/Users';
import Toggle from './components/toggle/Toggle';

export default class App extends Component {
  constructor (){
    super();
    this.state = {
      users: [],
      showUsers: false,

    }
  }
  
  async componentDidMount(){
    const res = await fetch(' https://randomuser.me/api/?seed=rush&nat=br&results=10')
    const json = await res.json()
    console.log('componentDidMount de App.js');
    this.setState({
      users: json.results
    });
  }
  componentDidUpdate(){
    console.log('ComponentDidUpdate de App.js');
  }

  handleShowUsers = (isChecked)=>{
    this.setState({ showUsers: isChecked})
  }

  render() {
    const { showUsers, users} = this.state;
    return (
    <div>
      <h1>React LifeCycle</h1>
      <Toggle description = "Mostrar Usuários" enabled = {showUsers} onToggle = {this.handleShowUsers}/>
      <hr />

     {showUsers && <Users users = {users} />}
    </div>
  );  
}
}