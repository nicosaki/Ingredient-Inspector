import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';

// INITIAL STATE
const initialState = Map({
  barcode: '',
  cameraType: 'back',
  text: 'Scan Barcode',
  torchMode: 'off',
  type: ''
});

const SAVE_BARCODE = 'ScannerState/SAVE_BARCODE';

// ACTION CREATORS (Naming: camelCase)
export function saveBarcode(upc) {
  return {type: SAVE_BARCODE, payload: upc};
}

// REDUCER (Naming: PascalCase)
export default function ScannerStateReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_BARCODE:
      return state.update('barcode', barcode => action.payload);
    default:
      return state;
  }
}
