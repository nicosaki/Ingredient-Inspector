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
        <Text style={styles.text}>IngredientInspector is a tool to help you discover potentially harmful ingredients in products. It is not a substitute for reading the label. If you have food allergies, ALWAYS read the label.</Text>
        <Text style={styles.text}>Below, add ingredients of personal concern that you want IngredientInspector to check for. Please type each ingredient separated by a comma, and for maximized safety include bothe singular and pluralized forms of your concern. (eg. 'strawberries, strawberry') Be aware that IngedientInspector directly compares your input below to product ingredients, so errors here will result in errors in results</Text>
      <View style={styles.inputContainer}>
        <TextInput
            autoFocus={true}
            style={styles.textInput}
            onChangeText={(concerns) => this.setState({concerns})}
            value={this.state.concerns} />
      </View>
    </View>
    );
  },

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  formInput: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 300,
    backgroundColor: 'red'
  },
  textInput: {
    color: '#ffffff',
    flex: 1,
    width: 60,
    height: 60,
    fontSize: 16
  },
  inputContainer: {
    borderBottomColor: '#9E7CE3',
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10
  },
  title: {
    fontFamily: 'Overpass-Bold',
    height: 40,
    width: 40
  },
  body: {
    fontFamily: 'Overpass-Bold',
    flex: 1
  },
  linkButton: {
    textAlign: 'center',
    color: '#CCCCCC',
    marginBottom: 10,
    padding: 5
  },
  text: {
    color: 'black'
  }
});

export default ConcernsView;
