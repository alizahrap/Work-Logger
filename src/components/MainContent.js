import React, { Component } from 'react';
import '../css/App.css';
import { Switch, Route, Redirect } from 'react-router-dom'
import Day from './Day';
import Week from './Week';
import Month from './Month';
import Year from './Year';
import NewEntry from './NewEntry';
import NewEntryContainer from '../containers/NewEntryContainer';
import DayContainer from '../containers/DayContainer';

class MainContent extends Component {
    render() {
        return (
            <div className="main-content">
                <Switch>
                    <Redirect exact from='/' to='/Day/today'/>
                    <Route path='/Day/:day' component={DayContainer}/>
                    <Route path='/week' component={Week}/>
                    <Route path='/month' component={Month}/>
                    <Route path='/year' component={Year}/>
                    <Route path='/create/:dayTimestamp' component={NewEntryContainer}/>
                    <Route path='/edit/:dayTimestamp' component={NewEntryContainer}/>
                    <Redirect from='*' to='/Day/today'/>
                </Switch>
            </div>
        );
    }
}

export default MainContent;