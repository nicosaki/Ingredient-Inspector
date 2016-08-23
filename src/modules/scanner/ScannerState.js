// CounterState.js
import {Map} from 'immutable';

// INITIAL STATE
//
// We start by defining the initial state for this module. In most cases your
// module state will be an Immutable.Map. Even if your data is represented as a
// list, set or a primitive value, it's usually best to wrap it in a Map for
// maximum flexibility when refactoring your state

const initialState = Map({
  barcode: '',
  data: null
});

// ACTION TYPES (Naming: SCREAMING_CASE)
//
// Let's define constants for the action types. The action types must be globally unique,
// so we namespace them with a prefix to avoid accidental collisions. It also helps to make
// the action name descriptive, as it helps with debugging. In most cases the action constants
// will be private to the State file, but in some advanced scenarios may be exported

// const RETURN_UPC = 'ScannerState/RETURN_UPC';

// ACTION CREATORS (Naming: camelCase)
//
// Action creators are functions whose responsibility is to encapsulate the creation of the
// messages passed to the reducer. Their API should be consumer-friendly and hide as much of
// the internal implementation of the state update as possible.
//
// At their simplest Action creators just construct a Flux Standard Action -compliant action.
// Other times they may call asynchronous services and rely on a Redux middleware.
//
// Action creators are always named exports, `export function name() {...}`, or `export const name = ...`

export function increment() {
  return {type: UPDATE_NUMBER, payload: +1};
}

// REDUCER (Naming: PascalCase)
//
// Reducer is responsible for handling all the actions defined in this module. The first
// parameter is the previous state of this module, and should default to the initial state.
//
// The reducer then examines the `action` object and decides whether any state should change in
// response to that action. The reducer must return the updated state, or if no changes are made,
// the previous state without modifications.
//
// The reducer is always an ES6 default export.
//
// export default function CounterStateReducer(state = initialState, action) {
//   switch (action.type) {
//     case UPDATE_NUMBER:
//       return state.update('value', value => value + action.payload);
//     default:
//       return state;
//   }
// }
