import { combineReducers } from 'redux';
import notes from "./notes";
import auth from "./auth";
import users from "./users";


const romaApp = combineReducers({
  notes, auth, users
});

export default romaApp;
