import {connect} from 'react-redux';
import ContactedView from './ContactedView';

export default connect(
  state => ({
    contacted: state.getIn(['counter', 'contacted']),
    user_id: state.getIn(['auth', 'user_id'])
  })
)(ContactedView);
