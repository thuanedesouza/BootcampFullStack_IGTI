import React, { Component } from 'react'
import css from '../Counter/counter.module.css'

export default class Steps extends Component {
    render() {
        return <span className = {css.counterValue}>({this.props.currentStep})</span>;
}
}