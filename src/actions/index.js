export function addEntry(data) {
    return { type: "ADD_Log", data }
};

export function editEntry(data) {
    return { type: "EDIT_Log", data }
};

export function deleteEntry(ts) {
    return { type: "DELETE_Log", data : ts }
};