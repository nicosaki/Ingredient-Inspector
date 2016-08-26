import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';
import CounterStateReducer from '../counter/CounterState'

// INITIAL STATE

const initialState = Map({
  loading: false,
  avoid: [],
  approved: [],
  contacted: [],
  concerns: '',
  barcode: null,
  ingredients: null,
  scanned: false
});

// ACTION TYPES (Naming: SCREAMING_CASE)
// const QUERY_BARCODE = 'ScannerState/QUERY_BARCODE';
const QUERY_BARCODE = 'IngredientState/QUERY_BARCODE';
const GET_INGREDIENTS = 'IngredientState/GET_INGREDIENTS';
const GET_UPC = 'IngredientState/GET_UPC';
// const UPDATE_AVOID = 'ScannerState/UPDATE_AVOID';
// const UPDATE_APPROVED = 'ScannerState/UPDATE_APPROVED';
// const UPDATE_CONTACTED = 'ScannerState/UPDATE_CONTACTED';

// ACTION CREATORS (Naming: camelCase)
export function queryBarcode(upc) {
  return fetch('http://10.0.3.2:3000/ingredients/' + upc, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then( response => {
    let data = JSON.parse(response._bodyText)
    console.log("DATA: ", data)
    return {type: QUERY_BARCODE, payload: data.ingredients};
  })
}

export function getUpc() {
  return {type: GET_UPC};
}

export function getIngredients() {
  return {type: GET_INGREDIENTS};
}

// Reducer
export default function IngredientStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    // case RETRIEVE_USER:
    //   return state
    //     .update('user_id', user_id => action.payload.user_id)
    //     .update('avoid', avoid => action.payload.avoid)
    //     .update('approved', approved => action.payload.approved)
    //     .update('concerns', concerns => action.payload.concerns)
    //     .update('contacted', contacted => action.payload.contacted);
    // case UPDATE_CONCERNS:
    //   return state.update('concerns', concerns => concerns + action.payload);
    //
    // case UPDATE_CONTACTED:
    //   return state.update('contacted', contacted => contacted.prototype.concat(action.payload));
    //
    // case UPDATE_AVOID:
    //   return state.update('avoid', avoid => avoid.prototype.concat(action.payload));
    //
    // case UPDATE_APPROVED:
    //   return state.update('approved', approved => approved.prototype.concat(action.payload));
    case QUERY_BARCODE:
      return state.update('ingredients', ingredients => action.payload);

    case GET_UPC:
      return state.barcode;
    case GET_INGREDIENTS:
      return state.ingredients;
      
    // case FETCH_DATA:
    //   return state.update('data');

    default:
      return state;
  }
}
