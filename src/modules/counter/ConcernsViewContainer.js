import {connect} from 'react-redux';
import ConcernsView from './ConcernsView';

export default connect(
  state => ({
    avoid: state.getIn(['counter', 'avoid'])
  })
)(ConcernsView);
