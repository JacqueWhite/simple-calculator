import React from 'react'
import './style.css'

const NumberButtons = props => {
  const calculatorNumbers = []
  // add buttons for numbers 0 - 9
  for (let i = 0; i <= 9; i++) {
    calculatorNumbers.push(i)
  }
  // add button for decimal
  calculatorNumbers.push('.')
  // create buttons ui
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
    this.setState({ inputValues: event.target.value, output: '' })
  }

  handleAddInput = event => {
    this.setState({
      inputValues: this.state.inputValues + event.target.value,
      output: ''
    })
  }

  handleClick = number => {
    this.setState({ inputValues: this.state.inputValues + number, output: '' })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { inputValues } = this.state
    // remove all characters that do not match 0-9, ".", "," or "+"
    let scrubbedString = inputValues.replace(/[^0-9+.,-]+/g, '')
    // scrub last and first characters to be numbers only (or decimal or negative number), protect against negative first number
    if (
      isNaN(scrubbedString.charAt(0)) &&
      scrubbedString.charAt(0) !== '-' &&
      scrubbedString.charAt(0) !== '.'
    ) {
      scrubbedString = scrubbedString.substring(1)
    }
    if (isNaN(scrubbedString.charAt(scrubbedString.length - 1))) {
      scrubbedString = scrubbedString.substring(0, scrubbedString.length - 1)
    }
    // replace all "+" with "," to ultimately convert to an array (only necessary because user can use "+" button, keyboard "+", or ",")
    const stringArray = scrubbedString.replace(/[+]+/g, ',')

    // convert all to numbers
    const numbersArray = stringArray.split(',').map(Number)
    console.log(numbersArray)

    // throw exception if arguments is greater than 2
    if (numbersArray.length > 2) {
      this.setState({ inputValues: '', output: 'error - max input: 2 numbers' })
    } else {
      // else, sum all numbers and set output
      const sum = numbersArray.reduce((accumulator, a) => accumulator + a, 0)
      this.setState({ inputValues: '', output: sum })
    }
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
