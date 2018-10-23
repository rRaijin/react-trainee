import {
    FETCH_ALL_ARTICLES,
    GET_ARTICLE,
    ADD_ARTICLE
} from "../constants";


const initialState = [];

export default function articles(state=initialState, action) {
    let articleList = state.slice();

    switch (action.type) {

        case FETCH_ALL_ARTICLES:
            return [...state, ...action.articles];

        case GET_ARTICLE:
            return [...state, ...action.article];

        case ADD_ARTICLE:
            articleList.unshift(action.article);
            console.log('list', articleList);
            return articleList;

        default:
            return state;
    }
}
