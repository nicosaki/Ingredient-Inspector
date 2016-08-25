import {connect} from 'react-redux';
import AvoidView from './AvoidView';

export default connect(
  state => ({
    avoid: state.getIn(['counter', 'avoid']),
    user_id: state.getIn(['auth', 'user_id'])
  })
)(AvoidView);
