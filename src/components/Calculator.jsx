import React from 'react'
import './style.css'

const NumberButtons = props => {
  const calculatorNumbers = []
  for (let i = 0; i <= 9; i++) {
    calculatorNumbers.push(i)
  }
  calculatorNumbers.push('.')
  const Buttons = calculatorNumbers.map((number, index) => (
    <button
      className="number-button"
      value={number}
      onClick={() => props.handleClick(number)}
      key={index}
    >
      <p className="number-text">{number}</p>
    </button>
  ))
  return Buttons
}

export default class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValues: [],
      output: ''
    }
  }

  handleChange = event => {
    console.log('handle change')
    console.log(event)
    this.setState({ inputValues: event.target.value })
  }

  handleAddInput = event => {
    console.log('handle add input')
    console.log(event)
    this.setState({ inputValues: this.state.inputValues + event.target.value })
  }

  handleClick = number => {
    console.log('handle clicik')
    console.log(number)
    this.setState({ inputValues: this.state.inputValues + number })
  }

  handleSubmit = event => {
    console.log('handle submit')
    console.log(event)
    event.preventDefault()
    const string = this.state.inputValues
    // remove all characters that do not match 0-9, ".", or "+"
    let scrubbedString = string.replace(/[^0-9+.]+/g, '')
    // scrub last and first characters to be numbers only
    if (isNaN(scrubbedString.charAt(0))) {
      scrubbedString = scrubbedString.substring(1)
    }
    if (isNaN(scrubbedString.charAt(scrubbedString.length - 1))) {
      scrubbedString = scrubbedString.substring(0, scrubbedString.length - 1)
    }
    // eval() runs the string as javascript - in most cases, we do not want to use this for security/code injection purposes, but we are stripping the string first to avoid this
    const result = eval(scrubbedString)
    this.setState({ inputValues: '', output: result })
  }

  clearCalculator = () => {
    this.setState({ inputValues: '', output: '' })
  }

  render() {
    const { inputValues, output } = this.state
    return (
      <div className="calculator-container">
        <div className="calculator-header-container">
          <input
            type="text"
            name="calculator-input"
            className="calculator-input"
            placeholder="use keyboard or buttons"
            value={inputValues || output}
            onChange={this.handleChange}
          />
        </div>
        <div className="calculator-buttons-container">
          <div className="calculator-numbers-container">
            <NumberButtons handleClick={this.handleClick} />
          </div>
          <div className="calculator-operators-container">
            <button
              className="add-button"
              value="+"
              onClick={this.handleAddInput}
            >
              <p className="number-text">+</p>
            </button>
            <button
              className="submit-button"
              value="="
              onClick={this.handleSubmit}
            >
              <p className="number-text">=</p>
            </button>
            <button className="clear-button" onClick={this.clearCalculator}>
              <p className="number-text">C</p>
            </button>
          </div>
        </div>
      </div>
    )
  }
}
