import {
    ADD_NOTE,
    DELETE_NOTE,
    FETCH_NOTES,
    UPDATE_NOTE
} from "../constants";


const initialState = [];

export default function notes(state=initialState, action) {
  let noteList = state.slice();

  switch (action.type) {

    case FETCH_NOTES:
      return [...state, ...action.notes];

    case ADD_NOTE:
      noteList.push(action.note);
      return noteList;

    case UPDATE_NOTE:
      let noteToUpdate = noteList[action.index];
      noteToUpdate.text = action.note.text;
      noteList.splice(action.index, 1, noteToUpdate);
      return noteList;

    case DELETE_NOTE:
      noteList.splice(action.index, 1);
      return noteList;

    default:
      return state;
  }
}
