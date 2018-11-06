import {AUTHENTICATION_ERROR, DELETE_SELF_ARTICLE, FETCH_SELF_ARTICLES, UPDATE_SELF_ARTICLE} from "../constants";

export const fetchSelfArticles = author_id => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch(`/api/articles/${author_id}/self_articles/`, {headers, })
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          return dispatch({type: FETCH_SELF_ARTICLES, articles: res.data});
        }
      })
  }
};

export const updateSelfArticle = (index, headline, description, image) => {
  return (dispatch, getState) => {
    let headers = {};
    let {token} = getState().auth;
    let {user} = getState().auth.user;
    console.log('user', user);

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }
    let articleId = getState().self_articles[index].id;
    console.log('id', articleId);

    let formData = new FormData();
    formData.append('headline', headline);
    formData.append('description', description);
    if (image !== null) {
        formData.append('image', image, image.name);
    }

    return fetch(`/api/articles/${articleId}/`, {headers, method: "PUT", body: formData})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          throw res;
        }
      })
      .then(res => {
        console.log('update response', res);
        if (res.status === 200) {
          return dispatch({type: UPDATE_SELF_ARTICLE, article: res.data, index});
        }
      })
  }
};


export const deleteSelfArticle = index => {
  return (dispatch, getState) => {

    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }
    let {user} = getState().auth;
    console.log('user', user);
    console.log('kurwa', getState().self_articles);

    let articleId = getState().self_articles[index].id;
    console.log('id', articleId);

    return fetch(`/api/articles/${articleId}/`, {headers, method: "DELETE"})
      .then(res => {
        if (res.status === 204) {
          return {status: res.status, data: {}};
        } else if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        console.log('deleted', res);
        if (res.status === 204) {
          return dispatch({type: DELETE_SELF_ARTICLE, index});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: AUTHENTICATION_ERROR, data: res.data});
          throw res.data;
        }
      })
  }
};