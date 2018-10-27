import { combineReducers } from 'redux';

import articles from "./articles";
import auth from "./auth";
import notes from "./notes";
import users from "./users";


const romaApp = combineReducers({
    articles,
    auth,
    notes,
    users,
});

export default romaApp;
