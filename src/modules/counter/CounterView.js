import * as CounterState from './CounterState';
import * as NavigationState from '../../modules/navigation/NavigationState';
import React, {PropTypes} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View
} from 'react-native';

const CounterView = React.createClass({
  propTypes: {
    userName: PropTypes.string, //removed counter
    userProfilePhoto: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    avoid: PropTypes.array, //UNSURE IF ARRAY IS LEGIT
    approved: PropTypes.array,
    contacted: PropTypes.array
  },
  about() {
    this.props.dispatch(NavigationState.pushRoute({
      key: 'About',
      title: 'About IngredientInspector'
    }));
  },
  avoid() {
    this.props.dispatch(NavigationState.pushRoute({
      key: 'Avoid',
      title: 'Avoid'
    }));
  },
  approved() {
    this.props.dispatch(NavigationState.pushRoute({
      key: 'Approved',
      title: 'Approved'
    }));
  },
  contacted() {
    this.props.dispatch(NavigationState.pushRoute({
      key: 'Contacted',
      title: 'Contacted'
    }));
  },
  concerns() {
    this.props.dispatch(NavigationState.pushRoute({
      key: 'Concerns',
      title: 'High-Concern Ingredients'
    }));
  },


  renderUserInfo() {
    if (!this.props.userName) {
      return null;
    }

    return (
      <View style={styles.userContainer}>
        <Image
          style={styles.userProfilePhoto}
          source={{
            uri: this.props.userProfilePhoto,
            width: 80,
            height: 80
          }}
        />
        <Text style={styles.linkButton}>
          Welcome, {this.props.userName}!
        </Text>
      </View>
    );
  },
  render() {
    const loadingStyle = this.props.loading
      ? {backgroundColor: '#eee'}
      : null;

    return (
      <View style={styles.container}>

        {this.renderUserInfo()}

        <TouchableOpacity
          onPress={this.approved}
          style={[styles.counterButton, loadingStyle]}>
          <Text style={styles.counter}>
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

export default CounterView;
