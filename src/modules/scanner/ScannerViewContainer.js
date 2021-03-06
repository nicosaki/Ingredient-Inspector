import {connect} from 'react-redux';
import Scanner from '../../components/Scanner';

// pass the counter's value to the component as a prop called `value`.
// Because we omit the second parameter, the `dispatch` function is
// automatically passed as a prop.
export default connect(
  state => ({
    barcode: state.getIn(['ingredients', 'barcode']),
    ingredients: state.getIn(['ingredients', 'ingredients']),
    user_id: state.getIn(['auth', 'user_id'])
  })

)(Scanner);
