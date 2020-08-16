import React, {Component} from 'react';
import css from './counter.module.css';
import IncrementButton from './IncrementButton';
import DecrementButton from './DecrementButton';
import Value from './Value'
import Steps from './Steps'

export default class Counter2 extends Component{
    
    handdleButtonClick = (clickType) => {
        
        this.props.onCount(clickType);
    };

    render(){ 
        const {countValue, currentStep} = this.props
        return (
            <div className = {css.counterContainer}>
              <DecrementButton onDecrement = {this.handdleButtonClick}/>
              <Value value = {countValue} />
            <IncrementButton onIncrement = {this.handdleButtonClick}/>
              <Steps currentStep = {currentStep} />
            </div>
        )
    }
}