import React, { Component } from 'react';
import './css/App.css';
import AppBody from './components/AppBody';
import AppHeader from './components/AppHeader';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader />
        <AppBody />
      </div>
    );
  }
}

export default App;
