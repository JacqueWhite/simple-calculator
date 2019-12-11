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
  return <div>{Buttons}</div>
}

export default class Calculator extends React.Component {
  render() {
    return (
      <div className="calculator-container">
        <div className="calculator-header-container">
          <input
            type="text"
            name="calculator-input"
            className="calculator-input"
          />
        </div>
        <div>
          <NumberButtons />
        </div>
      </div>
    )
  }
}
