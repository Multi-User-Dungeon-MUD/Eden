import axios from "axios";

export const LOGIN_FETCH = "LOGIN_FETCH";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const fetchRegistration = (account, history) => dispatch => {
  dispatch({ type: LOGIN_FETCH });
  console.log(process.env.REACT_APP_EDEN_HEROKU_API);
  axios
    .post(`${process.env.REACT_APP_EDEN_HEROKU_API}registration/`, account)
    .then(res => {
      console.log("registration post response", res);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      localStorage.setItem("token", `Token ${res.data.key}`);
      history.push("/map");
    })
    .catch(err => {
      console.log("error here", err);
      dispatch({ type: LOGIN_FAILURE, payload: err });
    });
};

export const fetchLogin = (account, history) => dispatch => {
  dispatch({ type: LOGIN_FETCH });

  axios
    .post(`${process.env.REACT_APP_EDEN_HEROKU_API}login/`, account)
    .then(res => {
      console.log("login post response", res);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      localStorage.setItem("token", `Token ${res.data.key}`);
      history.push("/map");
    })
    .catch(err => {
      console.log("error here", err);
      dispatch({ type: LOGIN_FAILURE, payload: err });
    });
};
