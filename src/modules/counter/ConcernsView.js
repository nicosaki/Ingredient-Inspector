import * as CounterState from './CounterState';
import * as NavigationState from '../../modules/navigation/NavigationState';
import React, {PropTypes} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  TextInput
} from 'react-native';

const ConcernsView = React.createClass({
  propTypes: {
    //UNSURE IF ARRAY IS LEGIT
    approved: PropTypes.array
  },

  updateConcerns(concerns) {
    this.props.dispatch(CounterState.updateConcerns(concerns));
  },

  renderConcernsList() {
    if (!this.props.userName) {
      return null;
    }

    return (
      <View>
        <Text>IngredientInspector is a tool to help you discover potentially harmful ingredients in products. It is not a substitute for reading the label. If you have food allergies, ALWAYS read the label.</Text>
        <Text>Below, add ingredients of personal concern that you want IngredientInspector to watch for. Please type each ingredient separated by a comma, and for maximized safety include bothe singular and pluralized forms of your concern. (eg. 'strawberries, strawberry')</Text>
        <TextInput
            style={styles.formInput}
            onChangeText={(text) => this.saveData(text)}
            value={this.state.concerns} />
          <button onPress={this.updateConcerns(this.state.concerns)}>Save!</button>
      </View>
    );
  },
//saveData saves text to state.concerns, updateConcerns action takes in state, calls, and updates state again? WATCH FOR WEIRDNESS
  render() {
    const loadingStyle = this.props.loading
      ? {backgroundColor: '#eee'}
      : null;

    return (
      <View style={styles.container}>
        {this.renderConcernsList()}
      </View>
    );
  }
});

const circle = {
  borderWidth: 0,
  borderRadius: 40,
  width: 80,
  height: 80
};

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

export default ConcernsView;
