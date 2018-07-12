import React, { Component } from "react";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1 className="text-danger">Hello, Electron!</h1>
        <p>{this.props.content}</p>
        <p>I hope you enjoy using basic-electron-react-boilerplate to start your dev off right!</p>
      </div>
    )
  }
}

export default App
