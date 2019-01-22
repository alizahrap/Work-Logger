import React, { Component } from 'react';
import '../css/App.css';
import { Link } from 'react-router-dom'

class AppHeader extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App-header">
                <div id='appTitle'><Link to='/day/today' style={{textDecoration: 'none', color: '#fff'}}>Daily Logger</Link></div>
            </div>
        );
    }
}

export default AppHeader;