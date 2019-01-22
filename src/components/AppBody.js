import React, { Component } from 'react';
import '../css/App.css';
import NavPane from './NavPane.js';
import MainContent from './MainContent.js';

class AppBody extends Component {
    render() {
        return (
            <div className="app-body">
                <NavPane />
                <MainContent />
            </div>
        );
    }
}

export default AppBody;