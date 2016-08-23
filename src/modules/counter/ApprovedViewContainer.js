import {connect} from 'react-redux';
import ApprovedView from './ApprovedView';

export default connect(
  state => ({
    avoid: state.getIn(['counter', 'avoid'])
  })
)(ApprovedView);
