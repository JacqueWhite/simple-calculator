import React from "react"
import "./style.css"

const NumberButtons = () => {
  const calculatorNumbers = []
  for (let i = 0; i <= 9; i++) {
    calculatorNumbers.push(i)
  }
  const Buttons = calculatorNumbers.map(number => (
    <button className="number-button">
      <p className="number-text">{number}</p>
    </button>
  ))
  return Buttons
}

const handleChange = event => {
  this.setState({ inputValues: event.target.value })
}

export default class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValues: "",
      output: ""
    }
  }

  handleChange = event => {
    this.setState({ inputValues: event.target.value })
    console.log(this.state)
  }

  render() {
    const { inputValues } = this.state
    return (
      <div className="calculator-container">
        <div className="calculator-header-container">
          <input
            type="text"
            name="calculator-input"
            className="calculator-input"
            value={inputValues}
            onChange={this.handleChange}
          />
        </div>
        <div className="calculator-buttons-container">
          <div className="calculator-numbers-container">
            <NumberButtons />
          </div>
          <div className="calculator-operators-container">
            <button className="add-button">
              <p className="number-text">+</p>
            </button>
          </div>
        </div>
      </div>
    )
  }
}
