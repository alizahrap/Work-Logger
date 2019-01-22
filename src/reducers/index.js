let storedLogs = localStorage.getItem('logs');
if (storedLogs) 
storedLogs = JSON.parse(storedLogs);

const initialState = {
    logs: storedLogs || []
};

function rootReducer(state = initialState, action) {
    let res = state,
        logs = [];
    switch(action.type) {
        case 'ADD_Log':
            logs = state.logs;
            logs.push(action.data);
            res = Object.assign({}, state, {logs});
            break;
        case 'EDIT_Log':
            logs = state.logs.map(obj => (obj.timestamp === action.data.timestamp) ? action.data : obj);
            res = Object.assign({}, state, {logs});
            break;
        case 'DELETE_Log':
            logs = state.logs.filter(obj => obj.timestamp !== action.data);
            res = Object.assign({}, state, {logs});
            break;
        default:
            res = state;
    }
    return res;
};

export default rootReducer;