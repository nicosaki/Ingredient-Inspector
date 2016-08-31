import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';
// import CounterStateReducer from '../counter/CounterState'

// INITIAL STATE

const initialState = Map({
  loading: false,
  // avoid: [],
  // approved: [],
  // contacted: [],
  // concerns: '',
  product: '',
  brand: '',
  ingredients: [],
  scanned: false
});

// ACTION TYPES (Naming: SCREAMING_CASE)
// const QUERY_BARCODE = 'ScannerState/QUERY_BARCODE';
const QUERY_BARCODE = 'IngredientState/QUERY_BARCODE';
// const GET_INGREDIENTS = 'IngredientState/GET_INGREDIENTS';
// const GET_UPC = 'IngredientState/GET_UPC';
// const UPDATE_AVOID = 'ScannerState/UPDATE_AVOID';
// const UPDATE_APPROVED = 'ScannerState/UPDATE_APPROVED';
// const UPDATE_CONTACTED = 'ScannerState/UPDATE_CONTACTED';

// ACTION CREATORS (Naming: camelCase)
export function queryBarcode(upc, callback) {
  return fetch('https://ingredientinspector-serve.herokuapp.com/ingredients/' + upc.toString(), {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then( response => {
    let data = JSON.parse(response._bodyText)
    console.log("DATA: ", data)
    // console.log("INGREDIENTS: ", data.ingredients)
    if (data.ingredients) {
      callback({type: QUERY_BARCODE, payload: data.ingredients})
    } else {
      callback({type: QUERY_BARCODE, payload: []})
    }
  })
}

// Reducer
export default function IngredientStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case QUERY_BARCODE:
      return state
        .set('ingredients', action.payload)
        .set('product', action.payload.product)
        .set('brand', action.payload.brand)
        .set('loading', false);

    default:
      return state;
  }
}
