import {FETCH_ALL_ARTICLES} from "../constants";


const initialState = [];

export default function articles(state=initialState, action) {

  switch (action.type) {

    case FETCH_ALL_ARTICLES:
      return [...state, ...action.articles];

    default:
      return state;
  }
}
