import React from 'react'
import css from '../Counter/counter.module.css'

export default function Steps (props) {
    return <span className = {css.counterValue}>({props.currentStep})</span>;
}