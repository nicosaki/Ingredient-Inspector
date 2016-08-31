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
const RETURN_INGREDIENTS = 'IngredientState/RETURN_INGREDIENTS';
// const GET_INGREDIENTS = 'IngredientState/GET_INGREDIENTS';
// const GET_UPC = 'IngredientState/GET_UPC';
// const UPDATE_AVOID = 'ScannerState/UPDATE_AVOID';
// const UPDATE_APPROVED = 'ScannerState/UPDATE_APPROVED';
// const UPDATE_CONTACTED = 'ScannerState/UPDATE_CONTACTED';

// ACTION CREATORS (Naming: camelCase)
export function queryBarcode(upc, id, callback) {
  return fetch('https://ingredientinspector-serve.herokuapp.com/ingredients/' + upc.toString() + '/' + id, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then( response => {
    let data = JSON.parse(response._bodyText)
    console.log("INGREDIENTS_DATA: ", data)
    if (data.ingredients && data.message !== "No ingredients added") {
      callback({type: QUERY_BARCODE, payload: data})
    } else {
      callback({type: RETURN_INGREDIENTS, payload: {ingredients: ['No ingredients added']}})
    }
  })
}

// Reducer
export default function IngredientStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case QUERY_BARCODE:
      return state
        .set('ingredients', action.payload.ingredients)
        .set('product', action.payload.product)
        .set('brand', action.payload.brand)
        .set('loading', false);
    case RETURN_INGREDIENTS:
      return state
        .set('ingredients', action.payload.ingredients);
    default:
      return state;
  }
}
