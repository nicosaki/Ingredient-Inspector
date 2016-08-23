import {connect} from 'react-redux';
import AvoidView from './AvoidView';

export default connect(
  state => ({
    avoid: state.getIn(['counter', 'avoid'])
  })
)(AvoidView);
