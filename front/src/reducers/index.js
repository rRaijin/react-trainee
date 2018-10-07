import { combineReducers } from 'redux';
import notes from "./notes";
import auth from "./auth";
import users from "./users";
import articles from "./articles";


const romaApp = combineReducers({
    notes,
    auth,
    users,
    articles,
});

export default romaApp;
