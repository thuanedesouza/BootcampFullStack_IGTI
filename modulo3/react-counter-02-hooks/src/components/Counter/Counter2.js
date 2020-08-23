import React from 'react';
import css from './counter.module.css';
import IncrementButton from './IncrementButton';
import DecrementButton from './DecrementButton';
import Value from './Value'
import Steps from './Steps'

export default function Counter2 (props){
    
    const handdleButtonClick =  (clickType) => {
        
        props.onCount(clickType);
    };
        const {countValue, currentStep} = props
      
        return (
            <div className = {css.counterContainer}>
              <DecrementButton onDecrement = {handdleButtonClick}/>
              <Value value = {countValue} />
            <IncrementButton onIncrement = {handdleButtonClick}/>
              <Steps currentStep = {currentStep} />
            </div>
        )
    
}