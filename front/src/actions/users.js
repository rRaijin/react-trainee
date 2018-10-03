export const updateName = (userId, newname) => {
  return (dispatch, getState) => {

    let headers = {"Content-Type": "application/json", 'Access-Control-Allow-Origin': 'http://localhost:3000'};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    let body = JSON.stringify({"username":newname});

    console.log(headers, body);

    return fetch(`/api/users/${userId}/`, {headers, method: "PUT", body})
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
          return dispatch({type: 'UPDATE_USERNAME', user: res.data, userId});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
};
