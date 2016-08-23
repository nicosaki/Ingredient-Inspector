import * as CounterState from './CounterState';
import * as NavigationState from '../../modules/navigation/NavigationState';
import React, {PropTypes} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from 'react-native';

const IngredientView = React.createClass({
  setState('loading', loading => true)

  let upc = this.state.barcode.toString()

  data = fetch('https://localhost:3000/' + upc, {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  // body: JSON.stringify({
  //   firstParam: 'yourValue',
  //   secondParam: 'yourOtherValue',
  // })
  })



  propTypes: {
    barcode: PropTypes.string
  },

  contact_manufacturer(checked) {
    this.props.dispatch(CounterState.updateContacted(checked));
  },

  update_avoid() {
    this.props.dispatch(CounterState.updateAvoid(barcode));
  },

  update_approved() {
    this.props.dispatch(CounterState.updateApproved(barcode));
  },

  update_concerns(checked) {
    this.props.dispatch(CounterState.updateConcerns(checked));
  },


  render() {
    const loadingStyle = this.props.loading
      ? {backgroundColor: '#eee'}
      : null;

    return (
      <View style={styles.container}>
        {this.data.ingredients}

        <TouchableOpacity
          onPress={this.approved}>
          <Text style={[styles.linkButton]}>
            See your Approved list
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.avoid}>
          <Text style={styles.linkButton}>
            See your Avoid list
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.contacted}>
          <Text style={styles.linkButton}>
            See manufacturers you have contacted
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.about} accessible={true}>
          <Text style={styles.linkButton}>
            {'About IngredientInspector'}
          </Text>
        </TouchableOpacity>

      </View>
    );
  }
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  userContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  userProfilePhoto: {
    ...circle,
    alignSelf: 'center'
  },
  counterButton: {
    ...circle,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  counter: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
  welcome: {
    textAlign: 'center',
    color: 'black',
    marginBottom: 5,
    padding: 5
  },
  linkButton: {
    textAlign: 'center',
    color: '#CCCCCC',
    marginBottom: 10,
    padding: 5
  }
});

export default IngredientView;
