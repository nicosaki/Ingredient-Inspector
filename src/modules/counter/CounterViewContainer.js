import {connect} from 'react-redux';
import CounterView from './CounterView';

export default connect(
  state => ({
    avoid: state.getIn(['counter', 'avoid']),
    loading: state.getIn(['counter', 'loading']),
    userName: state.getIn(['auth', 'currentUser', 'name']),
    userProfilePhoto: state.getIn(['auth', 'currentUser', 'picture']),
    approved: state.getIn(['counter', 'approved']),
    contacted: state.getIn(['counter', 'contacted'])
    // user_id: state.getIn(['auth', 'user_id'])
  })
)(CounterView);
