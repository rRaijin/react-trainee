import {
    FETCH_SELF_ARTICLES,
    UPDATE_SELF_ARTICLE,
    DELETE_SELF_ARTICLE
} from "../constants";


const initialState = [];

export default function self_articles(state=initialState, action) {
    let articleList = state.slice();

    switch (action.type) {

        case FETCH_SELF_ARTICLES:
            return action.articles;

        case UPDATE_SELF_ARTICLE:
            let articleToUpdate = articleList[action.index];
            articleToUpdate.headline = action.article.headline;
            articleToUpdate.description = action.article.description;
            articleToUpdate.image.name = action.article.image.name;
            articleList.splice(action.index, 1, articleToUpdate);
            return articleList;

        case DELETE_SELF_ARTICLE:
            articleList.splice(action.index, 1);
            return articleList;

        default:
            return state;
    }
}
