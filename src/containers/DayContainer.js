import React from "react";
import { connect } from "react-redux";
import { addEntry, deleteEntry } from "../actions";
import Day from "../components/Day";
import { getDayLogs } from "../Helpers/LogFilterHelper";
import { getDateVals } from "../Helpers/DateHelper";

const mapStateToProps = (state, ownProps) => {
    const dateValues = getDateVals(ownProps.match.params.day);
    return {
        curDateTxt: dateValues.current.text,
        todayLink: '/day/today',
        prevDateLink: "/day/" + dateValues.prev.ts,
        nextDateLink: "/day/" + dateValues.next.ts,
        addLogLink: "/create/" + dateValues.current.ts,
        data: getDayLogs(state.logs, ownProps.match.params.day) 
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteEntry : ts => dispatch(deleteEntry(ts))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Day);