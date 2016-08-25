import {connect} from 'react-redux';
import ApprovedView from './ApprovedView';

export default connect(
  state => ({
    approved: state.getIn(['counter', 'approved']),
    user_id: state.getIn(['auth', 'user_id'])
  })
)(ApprovedView);
