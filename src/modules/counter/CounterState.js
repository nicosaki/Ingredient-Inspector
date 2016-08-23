import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';
import {generateRandomNumber} from '../../services/randomNumberService';

// Initial state
const initialState = Map({
  avoid: [],
  approved: [],
  contacted: [],
  concerns: []
});

// Actions
const UPDATE_CONCERNS = 'CounterState/UPDATE_CONCERNS';
const UPDATE_AVOID = 'CounterState/UPDATE_AVOID';
const UPDATE_APPROVED = 'CounterState/UPDATE_APPROVED';
const UPDATE_CONTACTED = 'CounterState/UPDATE_CONTACTED';

// Action creators
export function updateConcerns(checked) {
  return {type: UPDATE_CONCERNS, payload: checked};
}

export function updateContacted(upc) {
  return {type: UPDATE_CONTACTED, payload: upc};
}

export function updateAvoid(upc) {
  return {type: UPDATE_AVOID, payload: upc};
}

export function updateApproved(upc) {
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
    case UPDATE_CONCERNS:
      return state.update('concerns', concerns => concerns + action.payload);

    case UPDATE_CONTACTED:
      return state.update('contacted', contacted => contacted + action.payload);

    case UPDATE_AVOID:
      return state.update('avoid', avoid => avoid + action.payload);

    case UPDATE_APPROVED:
      return state.update('approved', approved => approved + action.payload);

    default:
      return state;
  }
}
