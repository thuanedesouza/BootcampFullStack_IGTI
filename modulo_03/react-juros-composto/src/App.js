import React, { useState } from 'react';

import PortionsAsResult from './components/PortionsAsResult';
import Value from './components/inputs/ValueInput';
import RateInput from './components/inputs/RateInput';
import PeriodInput from './components/inputs/PeriodInput';
import calculate from './helpers/calculo'



export default function App () {
  const [initialValue, setInitialValue] = useState(100);
  const [period, setPeriod] = useState(1);
  const [rate, setRate] = useState(0.5);


  const handleValue = (event) => {
    let userValue = event.target.value;
  setInitialValue(userValue);
  }

  const handleRate = (event) => {
  let userRate = event.target.value;
  setRate(userRate);
  }

  const handlePeriod = (event) => {
   let  userPeriod = event.target.value;
    setPeriod(userPeriod)
  }

  const calculatedObject = calculate(initialValue, rate, period);

console.log(calculatedObject)

    return <div className = "container">
      <h1 >React Juros Compostos</h1>
      <div className = "input-field" style = {styles.flexRow}>
        <Value onValueChange = {handleValue}/>
        <RateInput  onRateChange = {handleRate}/>
        <PeriodInput  onPeriodChange = {handlePeriod}/>
      </div>
      <PortionsAsResult calculatedObject= {calculatedObject} />
    </div>

}
const styles = {
  flexRow: {
      display : 'flex',
      flexDirection: 'row', 
      alignItems: 'center',
      justifyContent: 'space-between' ,
      marginBottom:'40px',
  },
}