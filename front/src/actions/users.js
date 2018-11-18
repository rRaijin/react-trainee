import {
    AUTHENTICATION_ERROR,
    FETCH_USER,
    UPDATE_USER_ATTR
} from "../constants/index";


export const fetchUser = userId => {
  return (dispatch) => {

    let headers = {"Content-Type": "application/json", 'Access-Control-Allow-Origin': 'http://localhost:3000'};

    return fetch(`/api/users/${userId}/author/`, {headers, })
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
          return dispatch({type: FETCH_USER, user: res.data});
        }
      })
  }
};


export const updateUserAttr = (userId, attr, new_value) => {
  return (dispatch, getState) => {

    let headers = {"Content-Type": "application/json", 'Access-Control-Allow-Origin': 'http://localhost:3000'};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    let input_data = {};
    input_data[attr] = new_value;
    let body = JSON.stringify(input_data);

    return fetch(`/api/users/${userId}/`, {headers, method: "PATCH", body})
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
          return dispatch({type: UPDATE_USER_ATTR, user: res.data, userId});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: AUTHENTICATION_ERROR, data: res.data});
          throw res.data;
        }
      })
  }
};
