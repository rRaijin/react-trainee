import { combineReducers } from 'redux';
import notes from "./notes";
import auth from "./auth";


const romaApp = combineReducers({
  notes, auth,
});

export default romaApp;
