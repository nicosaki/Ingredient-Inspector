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
const RETRIEVE_USER = 'CounterState/RETRIEVE_USER';
// const USER_ID = state.getIn(['auth', 'user_id'])

// Action creators

// export function checkIfUpdate() {
//   return function(dispatch, getState) {
//     let currentState = getState
//     console.log("STATE FOR UPDATING: ", currentState)
//     if (!currentState.user_id) {
//       profile = currentState.currentUser
//       dispatch(retrieveUser(profile));
//     } else {
//       dispatch(returnState());
//     }
//   }


export function updateConcerns(new_concerns, userId = '1') {
  fetch('http://localhost:3000/user/' + userId, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      concerns: new_concerns,
    })
  })
  return {type: UPDATE_CONCERNS, payload: checked};
}

export function updateContacted(upc, userId = '1') {
  fetch('http://localhost:3000/user/' + userId + '/' + upc, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  return {type: UPDATE_CONTACTED, payload: upc};
}

export function updateAvoid(upc, userId = '1') {
  fetch('http://localhost:3000/user/' + userId + '/avoid/' + upc, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  return {type: UPDATE_AVOID, payload: upc};
}

export function updateApproved(upc, userId = '1') {
  fetch('http://localhost:3000/user/' + userId + '/appoved/' + upc, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  return {type: UPDATE_APPROVED, payload: upc};
}

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
        .update('user_id', user_id => action.payload.user_id)
        .update('avoid', avoid => action.payload.avoid)
        .update('approved', approved => action.payload.approved)
        .update('concerns', concerns => action.payload.concerns)
        .update('contacted', contacted => action.payload.contacted);
    case UPDATE_CONCERNS:
      return state.update('concerns', concerns => concerns + action.payload);

    case UPDATE_CONTACTED:
      return state.update('contacted', contacted => contacted.prototype.concat(action.payload));

    case UPDATE_AVOID:
      return state.update('avoid', avoid => avoid.prototype.concat(action.payload));

    case UPDATE_APPROVED:
      return state.update('approved', approved => approved.prototype.concat(action.payload));

    default:
      return state;
  }
}
