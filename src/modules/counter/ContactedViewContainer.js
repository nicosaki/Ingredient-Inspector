import {connect} from 'react-redux';
import ContactedView from './ContactedView';

export default connect(
  state => ({
    avoid: state.getIn(['counter', 'avoid'])
  })
)(ContactedView);
