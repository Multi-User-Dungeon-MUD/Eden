import axios from "axios";

export const LOGIN_FETCH = "LOGIN_FETCH";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const fetchLogin = (account, history) => dispatch => {
  dispatch({ type: LOGIN_FETCH });

  axios
    .post(`d/api/adv/login`, account)
    .then(res => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      history.push("/dashboard");
    })
    .catch(err => {
      console.log("error here", err);
      dispatch({ type: LOGIN_FAILURE, payload: err });
    });
};
