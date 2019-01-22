import React, { Component } from 'react';
import '../css/App.css';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import moment from 'moment';

class NewEntry extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: 'bug',
            desc: '',
            jira: '',
            startTimeMoment: null,
            endTimeMoment: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTxtChange = this.handleTxtChange.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
    }

    handleSubmit(e) {
        let dayTs = this.props.match.params.dayTimestamp,
            logDate = null;
        e.preventDefault();
        let resObj = {...this.state};
        if (parseInt(dayTs, 10) > 0) {
            logDate = new Date(parseInt(dayTs, 10));
            logDate.setHours(this.state.startTimeMoment.hours());
            logDate.setMinutes(this.state.startTimeMoment.minutes());
        }
        resObj.timestamp = (dayTs) ? logDate.getTime() : new Date().getTime();
        resObj.duration = Math.floor(moment.duration(this.state.endTimeMoment.diff(this.state.startTimeMoment)).asMinutes());
        if (this.props.match.path.indexOf('/create/') === 0) {
            this.props.addEntry(resObj);
        } else if (this.props.match.path.indexOf('/edit/') === 0) {
            this.props.editEntry(resObj);
        }
        this.props.history.goBack();
    }

    onTypeChange(type) {
        this.setState({type});
    }

    componentDidMount() {
        if (this.props.editLogObj) {
            let type, desc, jira, startTimeMoment, endTimeMoment;
            ({type, desc, jira, startTimeMoment, endTimeMoment} = this.props.editLogObj);
            startTimeMoment = (typeof startTimeMoment === "string") ? moment(startTimeMoment) : startTimeMoment;
            endTimeMoment = (typeof endTimeMoment === "string") ? moment(endTimeMoment) : endTimeMoment;
            this.setState({ type, desc, jira, startTimeMoment, endTimeMoment });
        }
    }

    handleTxtChange(e) {
        let obj = {};
        obj[e.target.id] = e.target.value;
        this.setState(obj);
    }

    render() {
        const format = 'h:mm a';

        const startTimeMoment = this.state.startTimeMoment || moment().hour(0).minute(0);
        const endTimeMoment = this.state.endTimeMoment || moment().hour(0).minute(0);

        const typeAr = [
            {name: 'Bug', val: 'bug', isActive: (this.state.type === 'bug')},
            {name: 'Story/Task', val: 'story_task', isActive: (this.state.type === 'story_task')},
            {name: 'Meeting', val: 'meeting', isActive: (this.state.type === 'meeting')},
            {name: 'Call', val: 'call', isActive: (this.state.type === 'call')},
            {name: 'Other', val: 'other', isActive: (this.state.type === 'other')}
        ];
        return (
            <form onSubmit={this.handleSubmit}>
            <div className="new-entry">
                <div className="heading">Log Type</div>
                <div className="type">
                    {typeAr.map(obj => <div key={obj.val} onClick={() => this.onTypeChange(obj.val)} className={obj.isActive ? "active" : ""}>{obj.name}</div>)}
                </div>
                <div>
                    <div className="heading">Start Time</div>
                    <TimePicker
                        allowEmpty={false}
                        showSecond={false}
                        value={startTimeMoment}
                        minuteStep={5}
                        popupClassName="log-timepicker"
                        onChange={(startTimeMoment)=>{this.setState({startTimeMoment})}}
                        format={format}
                        use12Hours
                    />
                </div>
                <div>
                    <div className="heading">End Time</div>
                    <TimePicker
                        allowEmpty={false}
                        showSecond={false}
                        value={endTimeMoment}
                        minuteStep={5}
                        popupClassName="log-timepicker"
                        onChange={(endTimeMoment)=>{this.setState({endTimeMoment})}}
                        format={format}
                        use12Hours
                    />
                </div>
                <div className="heading">Log Description</div>
                <input id="desc" value={this.state.desc} onChange={this.handleTxtChange} className="txtbox-div" type="text" placeholder="Describe the log..."/>
                <div className="heading">JIRA Link for this Log</div>
                <input id="jira" value={this.state.jira} onChange={this.handleTxtChange} className="txtbox-div" type="text" placeholder="JIRA link..."/>
                <input type='submit' className="btn" style={{alignSelf: 'center'}} value="save"/>
            </div>
            </form>
        );
    }
}

export default NewEntry;