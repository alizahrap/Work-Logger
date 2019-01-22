import React, { Component } from 'react';
import '../css/App.css';
import { minsToHrMin, getLogTime } from '../Helpers/DateHelper';
import 'font-awesome/css/font-awesome.min.css';
import { NavLink } from 'react-router-dom'

class TaskList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        function getHrMin(obj) {
            const hr = Math.floor(obj.duration/60);
            const min = obj.duration%60;
            return <span className="task-duration">
                <span>{(hr > 0) ? <span>{hr}<span className="greytxt"> hrs</span></span> : ""}</span>
                <span>{(min > 0) ? <span>{" " + min}<span className="greytxt"> mins</span></span> : ""}</span>
            </span>;
        }

        return (
            <ul className="task-list">
                {(this.props.data && this.props.data.length > 0) ? 
                this.props.data.map(obj => 
                    <li key={obj.timestamp + Math.random()} className="task-list-item">
                        <span className="task-log-time">{getLogTime(obj.timestamp)}</span>
                        <span className="task-separator"></span>
                        {getHrMin(obj)}
                        <span className="task-separator"></span>
                        <span style={{minWidth: '4vw'}}>{obj.type}</span>
                        <span className="task-separator"></span>
                        <div className="task-title">
                            {obj.desc || obj.title}
                            {obj.jira ? <a className="task-desc" href={obj.jira} target='_blank'>{obj.jira}</a> : ""}
                        </div>
                        <div className="task-controls">
                            <NavLink to={"/edit/" + obj.timestamp} className="fa fa-pencil"></NavLink>
                            <i onClick={()=>this.props.deleteEntry(obj.timestamp)} className="fa fa-trash-o"></i>
                        </div>    
                    </li>
                ) : 
                <div style={{textAlign: 'center',padding: '2em'}}>No logs on this day</div>
                }
            </ul>
        );
    }
}

export default TaskList;