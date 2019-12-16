import React from 'react'
import Calculator from '../components/Calculator'
import '../App.css'

export default class Home extends React.Component {
  render() {
    return (
      <div className="home-container">
        <div className="home-header-container">
          <h1 className="home-header-text">Addition Calculator</h1>
          <p className="home-header-subtext">
            use keyboard or calculator buttons (i.e. 2,2 or 2+2)
          </p>
        </div>
        <Calculator />
      </div>
    )
  }
}
