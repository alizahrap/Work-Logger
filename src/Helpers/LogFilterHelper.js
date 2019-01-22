function getTodayLogs(logs) {
    let t1 = new Date().setHours(0, 0, 0, 0),
        t2 = new Date();
    t2.setDate(t2.getDate() + 1);
    t2.setHours(0, 0, 0, 0);
    return logs.filter(obj => {
        return obj.timestamp >= t1 && obj.timestamp < t2; 
    });
}

function createDate(ts) {
    return (typeof(ts) === "string" && ts.toLowerCase() === 'today') ? new Date() : new Date(parseInt(ts, 10));
}

function getDayLogs(logs, ts) {
    let t1 = null,
        t2 = null;
    t1 = createDate(ts).setHours(0, 0, 0, 0);
    t2 = createDate(ts);

    t2.setDate(t2.getDate() + 1);
    t2.setHours(0, 0, 0, 0);
    return logs.filter(obj => {
        return obj.timestamp >= t1 && obj.timestamp < t2; 
    });
}

function getLog(logs, ts) {
    return logs.find(obj => {
        return obj.timestamp === parseInt(ts, 10); 
    });
}

export {
    getTodayLogs,
    getDayLogs,
    getLog
}