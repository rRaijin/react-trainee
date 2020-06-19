import {
    FETCH_ALL_ARTICLES,
    GET_ARTICLE,
    ADD_ARTICLE,
    FETCH_SELF_ARTICLES,
    DELETE_SELF_ARTICLE,
    UPDATE_SELF_ARTICLE
} from "../constants";

const initialState = [];

export default function articles(state=initialState, action) {
    let articleList = state.slice();

    switch (action.type) {

        case FETCH_ALL_ARTICLES:
            return [...state, ...action.articles];

        case FETCH_SELF_ARTICLES:
            return action.articles;

        case GET_ARTICLE:
            return [...state, ...action.article];

        case ADD_ARTICLE:
            articleList.unshift(action.article);
            return articleList;

        case UPDATE_SELF_ARTICLE:
            let articleToUpdate = articleList.filter(article => article.id === action.id)[0];
            let indexInArray = articleList.indexOf(articleToUpdate);
            articleToUpdate.headline = action.article.headline;
            articleToUpdate.description = action.article.description;
            articleToUpdate.img_name = action.article.image && action.article.image.name;
            articleList.splice(indexInArray, 1, articleToUpdate);
            return articleList;

        case DELETE_SELF_ARTICLE:
            return articleList.filter(article => article.id !== action.id);

        default:
            return state;
    }
}
