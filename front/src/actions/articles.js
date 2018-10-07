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
          return dispatch({type: 'FETCH_ALL_ARTICLES', articles: res.data});
        }
      })
  }
};
