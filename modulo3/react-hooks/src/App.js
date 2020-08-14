import React, {useState, useEffect} from 'react';
import { getNewTimeStamp } from './helpers/dateTimeHelpers.js';



export default function App () {
// usar as primeiras linhas com estado
// nome da variavel e o set da variavel
  const [clickArray, setClickArray] = useState([]);

  useEffect(()=>{
    document.title = clickArray.length;
  })

  const handleClick =  () => {//use é um prefixo para indicar que estamos trabalhando com hook
    const newClickArray = Object.assign([], clickArray);  
    newClickArray.push(getNewTimeStamp());
    setClickArray(newClickArray);
  }


    return (
      <div>
        <h1> React com <em> Hooks</em></h1>
        <h3> React é sempre <em> performático</em>, o useEffect na alteração to title antes de contar já começa com zero, diferente do  componentDidUpdate</h3>
        <button onClick = {handleClick}>Clique aqui</button>

        <ul>
          {clickArray.map((item)=>{
            return <li key = {item}>{item}</li>
          }) }
        </ul>
      </div>
    )
}
