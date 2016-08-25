import {connect} from 'react-redux';
import ConcernsView from './ConcernsView';

export default connect(
  state => ({
    concerns: state.getIn(['counter', 'concerns']),
    user_id: state.getIn(['auth', 'user_id'])
  })
)(ConcernsView);
