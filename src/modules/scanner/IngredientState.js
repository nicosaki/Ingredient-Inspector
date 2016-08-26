import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';
import CounterStateReducer from '../counter/CounterState'

// INITIAL STATE

const initialState = Map({
  barcode: this.state.barcode,
  loading: true,
});

// ACTION TYPES (Naming: SCREAMING_CASE)
const QUERY_BARCODE = 'ScannerState/QUERY_BARCODE';

// const UPDATE_AVOID = 'ScannerState/UPDATE_AVOID';
// const UPDATE_APPROVED = 'ScannerState/UPDATE_APPROVED';
// const UPDATE_CONTACTED = 'ScannerState/UPDATE_CONTACTED';

// ACTION CREATORS (Naming: camelCase)
export function updateApproved(upc, user_id = '1') {
  fetch('http://10.0.3.2:3000/user/' + user_id + '/appoved/' + upc, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  return {type: UPDATE_APPROVED, payload: upc};
}

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
