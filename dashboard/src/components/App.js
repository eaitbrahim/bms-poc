import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import socket from '../utilities/socketConnection';
import Widget from './Widget';

class App extends Component {
  constructor() {
    super();
    this.state = {
      performanceData: {}
    };
  }

  componentDidMount() {
    socket.on('data', data => {
      const currentState = {
        ...this.state.performanceData
      };
      currentState[data.macA] = data;
      this.setState({
        performanceData: currentState
      });
    });
  }

  render() {
    let widgets = [];
    // grab each machine, by property, from data
    Object.entries(this.state.performanceData).forEach(([key, value]) => {
      widgets.push(<Widget key={key} data={value} />);
    });

    return <div className='App'>{widgets}</div>;
  }
}

export default App;
