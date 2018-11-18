import {
    FETCH_ALL_ARTICLES,
    GET_ARTICLE,
    ADD_ARTICLE,
    AUTHENTICATION_ERROR,
    FETCH_SELF_ARTICLES,
    UPDATE_SELF_ARTICLE,
    DELETE_SELF_ARTICLE
} from "../constants";


export const crudUtil = (...args) => {
    const apiUrl = args[0];
    const httpMethod = args[1];
    const actionType = args[2];
    const single = args[3];

    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let {token} = getState().auth;

        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }

        return fetch(apiUrl, { headers, httpMethod })
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
                if (res.status === 200 || res.status === 201) {
                    if (single) {
                        return dispatch({type: actionType, article: res.data});
                    } else {
                        return dispatch({type: actionType, articles: res.data});
                    }
                }
            })
    }
};

export const fetchAllArticles = () => crudUtil(
    '/api/articles/',
    'GET',
    FETCH_ALL_ARTICLES,
    false
);

export const fetchSelfArticles = author_id => crudUtil(
    `/api/articles/${author_id}/self_articles/`,
    'GET',
    FETCH_SELF_ARTICLES,
    false
);

export const articleDetail = id => crudUtil(
    `/api/articles/${id}/`,
    'GET',
    GET_ARTICLE,
    true
);

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

export const updateSelfArticle = (id, headline, description, image) => {
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

    return fetch(`/api/articles/${id}/`, {headers, method: "PATCH", body: formData})
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
          return dispatch({type: UPDATE_SELF_ARTICLE, article: res.data, id});
        }
      })
  }
};


export const deleteSelfArticle = id => {
  return (dispatch, getState) => {

    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch(`/api/articles/${id}/`, {headers, method: "DELETE"})
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
        if (res.status === 204) {
          return dispatch({type: DELETE_SELF_ARTICLE, id});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: AUTHENTICATION_ERROR, data: res.data});
          throw res.data;
        }
      })
  }
};
