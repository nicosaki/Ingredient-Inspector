import {connect} from 'react-redux';
import IngredientView from './IngredientView';

// pass the counter's value to the component as a prop called `value`.
// Because we omit the second parameter, the `dispatch` function is
// automatically passed as a prop.
export default connect(
  function(state) {console.log("INGREDIENT_STATE-j: ", state.getIn(['ingredients', 'loading']));
  return {
    barcode: state.getIn(['scanner', 'barcode']),
    ingredients: state.getIn(['ingredients', 'ingredients']),
    avoid: state.getIn(['counter', 'avoid']),
    approved: state.getIn(['counter', 'approved']),
    contacted: state.getIn(['counter', 'contacted']),
    user_id: state.getIn(['auth', 'user_id']),
    loading: state.getIn(['ingredients', 'loading']),
    product: state.getIn(['ingredients', 'product']),
    brand: state.getIn(['ingredients', 'brand'])
  }}
)(IngredientView);
