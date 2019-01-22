import React from "react";
import { connect } from "react-redux";
import NewEntry from "../components/NewEntry";
import { addEntry, editEntry } from "../actions";
import { getLog } from "../Helpers/LogFilterHelper";

const mapStateToProps = (state, ownProps) => {
  if (ownProps.match.params.dayTimestamp) {
    return {editLogObj : getLog(state.logs, ownProps.match.params.dayTimestamp)};
  } else {
    return {};
  }
};

const mapDispatchToProps = dispatch => {
    return { 
        addEntry : data => dispatch(addEntry(data)),
        editEntry : data => dispatch(editEntry(data))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(NewEntry);