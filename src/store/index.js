import { createStore } from "redux";
import rootReducer from "../reducers/index";

const store = createStore(rootReducer);

store.subscribe(() => {
    localStorage.setItem('logs', JSON.stringify(store.getState().logs));
});

export default store;