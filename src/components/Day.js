import React, { Component } from 'react';
import '../css/App.css';
import TaskList from './TaskList';
import { NavLink } from 'react-router-dom'
import Calendar from 'react-calendar';
import 'font-awesome/css/font-awesome.min.css';
import moment from 'moment';

class Day extends Component {

    constructor(props) {
        super(props);
        this.state = {
            calDate : new Date(),
            calShow : false
        }
        this.onDatePick = this.onDatePick.bind(this);
        this.componentClick = this.componentClick.bind(this);
    }

    onDatePick(date) {
        this.setState({calDate : date});
        this.props.history.push('/day/' + date.getTime());
    }

    componentClick(e) {
        const cal = document.querySelector('.day-calendar');
        //console.log(cal.contains(e.target));
        if (!cal.contains(e.target) && this.state.calShow)
        this.setState({calShow : false});
    }

    render() {
        const calBtnTxt = (this.state.calShow) ? "Hide Calendar" : "Open Calendar";
        this.props.data.sort((a, b) => moment(a.startTimeMoment).unix() - moment(b.startTimeMoment).unix());
        let totalLogDuration = this.props.data.reduce((ac, ele) => (ac + ele.duration), 0);
        const hr = Math.floor(totalLogDuration/60);
        const min = totalLogDuration%60;
        totalLogDuration = (<span className="task-duration">
            <span>{(hr > 0) ? <span>{hr}<span className="greytxt"> hrs</span></span> : ""}</span>
            <span>{(min > 0) ? <span>{" " + min}<span className="greytxt"> mins</span></span> : ""}</span>
        </span>);

        return (
            <div onClick={this.componentClick} className="day">
                <div className="section-header">
                    <div className="navigator">
                        <NavLink to={this.props.prevDateLink} className="none cbtn fa fa-arrow-left"/>
                        <span className='cur-list-txt'>{this.props.curDateTxt}</span>
                        <NavLink to={this.props.nextDateLink} className="none cbtn fa fa-arrow-right"/>
                        {
                            this.props.curDateTxt.toLowerCase() !== 'today' ? 
                            <NavLink to={this.props.todayLink} className="none cbtn fa fa-calendar"/>
                            : ""
                        }
                    </div>
                    <div className="tools">
                        <span className="dbtn" style={{minWidth: '8vw'}} onClick={()=>this.setState({calShow : !this.state.calShow})}>{calBtnTxt}</span>
                        <NavLink to={this.props.addLogLink} className="btn">Add Log</NavLink>
                    </div>
                </div>
                <Calendar
                    className={this.state.calShow ? "day-calendar" : "day-calendar hide"}
                    onChange={this.onDatePick}
                    value={this.state.date}
                />
                {
                    (this.props.data && this.props.data.length > 0) ? 
                    <div className="day-summary">
                        <span><span style={{fontWeight: 'bold'}}>Logs</span> : {this.props.data.length}</span>
                        <span><span style={{fontWeight: 'bold'}}>Total Log Duration</span> : {totalLogDuration}</span>
                    </div>
                    : ""
                }
                <TaskList data={this.props.data || []} deleteEntry={this.props.deleteEntry}/>
            </div>
        );
    }
}

export default Day;