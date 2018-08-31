import axios from 'axios';
import ROOT_SERVER_URL from '../contracts/config';

export const ACTION_SIGNUP = 'SIGNUP';

export function signup(email) {
  const request = axios.post(
    `${ROOT_SERVER_URL}/leads`, {email});
  console.log("Server URL", ROOT_SERVER_URL);
  return (dispatch) => {
    request.then((data) => {
      console.log("Data", data);
      dispatch({
        type: ACTION_SIGNUP,
        payload: data
      })
    });
  };
}
