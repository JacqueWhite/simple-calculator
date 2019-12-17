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

    // STEP 6 & STEP 7

    // regex for inbetween "//" and a newline, define that as a delimeter
    const delimeterRegex = RegExp(/(?<=\/\/).*(?=\n)/, 'g')
    // return content between "//" and newline
    const delimeterContent = inputValues.match(delimeterRegex)
    // return true/false of delimeter regex in inputValues
    const hasUserDefinedDelimeter = delimeterRegex.test(inputValues)
    // regex for containing any strings with "[content]"
    const delimeterInBrackets = RegExp(/\[(.*?)\]/, 'g')
    // const delimArray = delimeterContent[0].match(delimeterInBrackets)
    // test the user defined delimeters for "[content]"
    const hasMultipleDelimeters = delimeterInBrackets.test(delimeterContent)

    let scrubbedString = ''
    let stringToCalculate = inputValues.split('\n')[1]
    // if the user defined a delimeter, replace all delimeters with "+"
    if (hasUserDefinedDelimeter && !hasMultipleDelimeters) {
      const newDelim = inputValues.match(/(?<=\/\/).*(?=\n)/g)
      var allDelims = RegExp(newDelim, 'g')
      scrubbedString = stringToCalculate.replace(allDelims, '+')

      // STEP 8 - allow for multiple user defined delimeters
    } else if (hasUserDefinedDelimeter && hasMultipleDelimeters) {
      const delimArray = delimeterContent[0].match(delimeterInBrackets)
      // for each delim, get the content of it and replace all items with "+"
      var i
      for (i = 0; i < delimArray.length; i++) {
        const tempDelim = delimArray[i].substring(1, delimArray[i].length - 1)
        stringToCalculate = stringToCalculate.split(tempDelim)
        stringToCalculate = stringToCalculate.join('+')
      }
      scrubbedString = stringToCalculate
    } else {
      // remove all characters that do not match 0-9, ".", ",", "+", or a newline character \n
      scrubbedString = inputValues.replace(/[^0-9+.,\-\n]+/g, '')
    }
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
    // replace all "+" and newlines with "," to ultimately convert to an array (only necessary because user can use "+" button, keyboard "+", or ",")
    const stringArray = scrubbedString.replace(/[+\n]+/g, ',')

    // convert all to numbers
    const numbersArray = stringArray.split(',').map(Number)
    console.log(numbersArray)

    // commenting out 2 arg limitation for step 2
    // throw exception if arguments is greater than 2
    // if (numbersArray.length > 2) {
    //   this.setState({ inputValues: '', output: 'error - max input: 2 numbers' })
    // } else {

    // STEP 3:  don't allow negative numbers, throw negative numbers provided
    const negativeNumbers = numbersArray.filter(x => x < 0)

    if (negativeNumbers.length) {
      this.setState({
        inputValues: '',
        output: `error - no negatives: ${negativeNumbers}`
      })
    } else {
      // else, sum all numbers and set output
      // STEP 5: ignore all numbers greater than 1000 and return sum
      const underThousand = numbersArray.filter(x => x <= 1000)
      const sum = underThousand.reduce((accumulator, a) => accumulator + a, 0)
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
          <textarea
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
