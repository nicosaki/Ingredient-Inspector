import {Map, fromJS} from 'immutable';

// Initial state
const initialState = Map({
  isLoggedIn: false,
  currentUser: null,
  authenticationToken: null,
  user_id: null
});

// Actions
const USER_LOGIN_SUCCESS = 'AppState/USER_LOGIN_SUCCESS';
const USER_LOGIN_ERROR = 'AppState/USER_LOGIN_ERROR';

export function onUserLoginSuccess(profile, token) {
  const USER = profile
  return fetch('http://10.0.3.2:3000/user/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      profile: USER,
    })
  })
  .then(response => {
    if (response.status >= 200 && response.status < 300) {
      console.log("API RESPONSE: ", response);
      let data = JSON.parse(response._bodyText)
      console.log("DATA: ", data)
      data = data.id
      console.log("ID: ", data)
      return {
        type: USER_LOGIN_SUCCESS,
        payload: {
          profile: fromJS(profile),
          token: fromJS(token),
          user_id: data
        }
      };
    } else {
      console.log("WHAT IS HAPPENING")
      const error = new Error(response.statusText);
      error.response = response;
      return {
        type: USER_LOGIN_ERROR,
        payload: error,
        error: true
      };
    }
  })
}

export function onUserLoginError(error) {
  return {
    type: USER_LOGIN_ERROR,
    payload: error,
    error: true
  };
}

// Reducer
export default function AuthStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return state
        .set('isLoggedIn', true)
        .set('currentUser', action.payload.profile)
        .set('authenticationToken', action.payload.token)
        .set('user_id', action.payload.id);
    case USER_LOGIN_ERROR:
      return initialState;
    default:
      return state;
  }
}
