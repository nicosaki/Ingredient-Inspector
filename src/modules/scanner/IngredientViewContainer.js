import {connect} from 'react-redux';
import Ingredient from './IngredientView';

// pass the counter's value to the component as a prop called `value`.
// Because we omit the second parameter, the `dispatch` function is
// automatically passed as a prop.
export default connect(
  state => ({
    barcode: state.getIn(['scanner', 'barcode'])
  })
)(Ingredient);
