function createDate(ts) {
    return (typeof(ts) === "string" && ts.toLowerCase() === 'today') ? new Date() : new Date(parseInt(ts, 10));
}

function isToday(ts) {
    const cur = new Date();
    cur.setHours(0, 0, 0, 0);
    let ts1 = cur.getTime();
    cur.setDate(cur.getDate() + 1);
    cur.setHours(0, 0, 0, 0);
    let ts2 = cur.getTime();
    return (typeof(ts) === "string" && ts.toLowerCase() === 'today') ? true : ((ts1 <= parseInt(ts, 10)) && (parseInt(ts, 10) < ts2));
}

function getDateVals(ts) {
    let curDate = null,
        prevDate,
        nextDate;
    curDate = createDate(ts);
    prevDate = new Date(curDate.getTime());
    nextDate = new Date(curDate.getTime());
    prevDate.setDate(prevDate.getDate() - 1);
    nextDate.setDate(nextDate.getDate() + 1);
    
    return {
        current : {
            text : isToday(ts) ? "Today" : (curDate.getDate() + '/' + (curDate.getMonth()+1) + '/' + curDate.getFullYear()),
            ts : curDate.getTime()
        },
        prev : {
            text : prevDate.getDate() + '/' + (prevDate.getMonth()+1) + '/' + prevDate.getFullYear(),
            ts : prevDate.getTime()
        },
        next : {
            text : nextDate.getDate() + '/' + (nextDate.getMonth()+1) + '/' + nextDate.getFullYear(),
            ts : nextDate.getTime()
        }
    };
}

function getLogTime(ts) {
    let date = new Date(ts);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

export {
    getDateVals,
    getLogTime
}