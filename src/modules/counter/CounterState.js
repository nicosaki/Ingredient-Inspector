import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';
import {generateRandomNumber} from '../../services/randomNumberService';

// Initial state
const initialState = Map({
  loading: false,
  avoid: [],
  approved: [],
  contacted: [],
  concerns: ''
});

// Actions
const CHECK_IF_UPDATE = 'CounterState/CHECK_IF_UPDATE'
const UPDATE_CONCERNS = 'CounterState/UPDATE_CONCERNS';
const UPDATE_AVOID = 'CounterState/UPDATE_AVOID';
const UPDATE_APPROVED = 'CounterState/UPDATE_APPROVED';
const UPDATE_CONTACTED = 'CounterState/UPDATE_CONTACTED';
const GET_USER_ID = 'CounterState/GET_USER_ID';


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

export function updateContacted(upc, user_id = '1') {
  if (upc) {
    fetch('https://ingredientinspector-serve.herokuapp.com/user/' + user_id + '/' + upc, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    return {type: UPDATE_CONTACTED, payload: [upc]};
  } else {
    return {type: GET_USER_ID, payload: []};
  }
}

export function updateAvoid(upc, user_id = '1', product) {
  if (upc) {
    fetch('https://ingredientinspector-serve.herokuapp.com/user/' + user_id + '/avoid/' + upc, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    return {type: UPDATE_AVOID, payload: [product]};
  } else {
    return {type: GET_USER_ID, payload: []};
  }
}

export function updateApproved(upc, user_id = '1', product) {
  if (upc) {
  fetch('https://ingredientinspector-serve.herokuapp.com/user/' + user_id + '/appoved/' + upc, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  return {type: UPDATE_APPROVED, payload: [product]};
} else {
  return {type: GET_USER_ID, payload: []};
}
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
    // case RETRIEVE_USER:
      // return state
      //   .update('user_id', user_id => action.payload.user_id)
      //   .update('avoid', avoid => action.payload.avoid)
      //   .update('approved', approved => action.payload.approved)
      //   .update('concerns', concerns => action.payload.concerns)
      //   .update('contacted', contacted => action.payload.contacted);
    case UPDATE_CONCERNS:
      return state.update('concerns', concerns => concerns + action.payload);

    case UPDATE_CONTACTED:
      return state.update('contacted', contacted => (contacted.concat(action.payload)));

    case UPDATE_AVOID:
      return state.update('avoid', avoid => avoid.concat(action.payload));

    case UPDATE_APPROVED:
      return state.update('approved', approved => approved.concat(action.payload));

    default:
      return state;
  }
}
