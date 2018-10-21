import {FETCH_ALL_ARTICLES, GET_ARTICLE} from "../constants";


const initialState = [];

export default function articles(state=initialState, action) {

  switch (action.type) {

    case FETCH_ALL_ARTICLES:
      return [...state, ...action.articles];

    case GET_ARTICLE:
      // return action.article;
      return [...state, ...action.article];

    default:
      return state;
  }
}
