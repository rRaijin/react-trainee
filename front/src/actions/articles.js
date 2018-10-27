import {
    FETCH_ALL_ARTICLES,
    GET_ARTICLE,
    ADD_ARTICLE,
    AUTHENTICATION_ERROR
} from "../constants";


export const fetchAllArticles = () => {
  return (dispatch) => {
    let headers = {"Content-Type": "application/json"};

    return fetch("/api/articles/", {headers, })
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          return dispatch({type: FETCH_ALL_ARTICLES, articles: res.data});
        }
      })
  }
};

export const articleDetail = id => {
  return (dispatch, getState) => {

    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch(`/api/articles/${id}/`, {headers, method: "GET"})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          return dispatch({type: GET_ARTICLE, article: res.data});
        }
      })
  }
};

export const addArticle = (headline, description, image) => {
  return (dispatch, getState) => {
    let headers = {};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    let formData = new FormData();
    formData.append('headline', headline);
    formData.append('description', description);
    if (image !== null) {
        formData.append('image', image, image.name);
    }

    return fetch("/api/articles/", {headers, method: "POST", body: formData})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 201) {
          return dispatch({type: ADD_ARTICLE, article: res.data});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: AUTHENTICATION_ERROR, data: res.data});
          throw res.data;
        }
      })
  }
};