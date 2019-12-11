import React from "react";
import "./style.css";

const NumberButtons = () => {
  const calculatorNumbers = [];
  for (let i = 0; i <= 9; i++) {
    calculatorNumbers.push(i);
  }
  const Buttons = calculatorNumbers.map(number => (
    <button className="number-button">
      <p className="number-text">{number}</p>
    </button>
  ));
  return Buttons;
};

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
    );
  }
}
