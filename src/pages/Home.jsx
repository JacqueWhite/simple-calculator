import React from "react";
import Calculator from "../components/Calculator";
import "../App.css";

export default class Home extends React.Component {
  render() {
    return (
      <div className="home-container">
        <h1>Home</h1>
        <Calculator />
      </div>
    );
  }
}
