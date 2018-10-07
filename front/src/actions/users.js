export const updateUserAttr = (userId, attr, new_value) => {
  console.log('input', attr);
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
      // .then(res => {return console.log(res.json())})
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
          return dispatch({type: 'UPDATE_USER_ATTR', user: res.data, userId});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
};
