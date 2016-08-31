import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';
import {generateRandomNumber} from '../../services/randomNumberService';

// Initial state
const initialState = Map({
  loading: false,
  avoid: [],
  approved: [],
  contacted: [],
  concerns: 'strawberry, strawberries, tomato',
  new_concerns: ''
});

// Actions
const UPDATE_CONCERNS = 'CounterState/UPDATE_CONCERNS';
const UPDATE_AVOID = 'CounterState/UPDATE_AVOID';
const UPDATE_APPROVED = 'CounterState/UPDATE_APPROVED';
const UPDATE_CONTACTED = 'CounterState/UPDATE_CONTACTED';
const RETRIEVE_USER = 'CounterState/RETRIEVE_USER';


export function retrieveUser(id) {
  return fetch('https://ingredientinspector-serve.herokuapp.com/user/' + id, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      profile: USER,
    })
  })
  .then(response => {
    if (response.status == "ok") {
      let data = JSON.parse(response._bodyText)
      return {
        type: USER_LOGIN_SUCCESS,
        payload: {
          avoid: data.avoid,
          approved: data.approved,
          concerns: data.concerns,
          contacted: data.contacted
        }
      };
    } else {
      return {
        type: USER_LOGIN_SUCCESS,
        payload: {
          avoid: [],
          approved: [],
          concerns: '',
          contacted: []
        }
    }
  }})
}

export function updateConcerns(new_concerns, user_id = 1) {
  fetch('https://ingredientinspector-serve.herokuapp.com/user/' + user_id, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      concerns: new_concerns,
    })
  })
  return {type: UPDATE_CONCERNS, payload: new_concerns};
}

export function updateContacted(upc, user_id = '1', new_contact) {
  if (upc) {
    fetch('https://ingredientinspector-serve.herokuapp.com/user/' + user_id + '/' + upc, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
  }
  return {type: UPDATE_CONTACTED, payload: new_contact};
}

export function updateAvoid(upc, user_id = '1', new_avoid) {
  if (upc) {
    fetch('https://ingredientinspector-serve.herokuapp.com/user/' + user_id + '/avoid/' + upc, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
  }
  return {type: UPDATE_AVOID, payload: new_avoid};
}

export function updateApproved(upc, user_id = '1', new_approved) {
  if (upc) {
  fetch('https://ingredientinspector-serve.herokuapp.com/user/' + user_id + '/appoved/' + upc, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
}
return {type: UPDATE_APPROVED, payload: new_approved};
}

// export function getUserId() {
//   return {type: GET_USER_ID};
// }

// export async function requestRandomNumber() {
//   return {
//     type: RANDOM_RESPONSE,
//     payload: await generateRandomNumber()
//   };
// }

// Reducer
export default function CounterStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case RETRIEVE_USER:
      return state
        .update('avoid', action.payload.avoid)
        .update('approved', action.payload.approved)
        .update('concerns', action.payload.concerns)
        .update('contacted', action.payload.contacted);
    case UPDATE_CONCERNS:
      return state.update('concerns', action.payload);

    case UPDATE_CONTACTED:
      return state.update('contacted', action.payload);

    case UPDATE_AVOID:
      return state.update('avoid', action.payload);

    case UPDATE_APPROVED:
      return state.update('approved', action.payload);

    default:
      return state;
  }
}
