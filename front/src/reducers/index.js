import { combineReducers } from 'redux';

import articles from "./articles";
import auth from "./auth";
import notes from "./notes";
import users from "./users";
import self_articles from "./self-articles";


const romaApp = combineReducers({
    articles,
    auth,
    notes,
    users,
    self_articles,
});

export default romaApp;
