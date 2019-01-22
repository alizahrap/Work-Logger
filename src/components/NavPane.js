import React, { Component } from 'react';
import '../css/App.css';
import { NavLink } from 'react-router-dom'

class NavPane extends Component {
    render() {
        return (
            <div className="nav-pane">
                <nav>
                    <ul>
                        <li><NavLink to='/day' className="nav-link" activeClassName="active-link">Day</NavLink></li>
                        <li><NavLink to='/week' className="nav-link" activeClassName="active-link">Week</NavLink></li>
                        <li><NavLink to='/month' className="nav-link" activeClassName="active-link">Month</NavLink></li>
                        <li><NavLink to='/week' className="nav-link" activeClassName="active-link">Timesheet View</NavLink></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default NavPane;