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
    userName: PropTypes.string,
    userProfilePhoto: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  },

  abouts() {
    this.props.dispatch(NavigationState.pushRoute({
      key: 'About',
      title: 'About IngredientInspector'
    }));
  },
  avoids() {
    this.props.dispatch(NavigationState.pushRoute({
      key: 'Avoid',
      title: 'Avoid'
    }));
  },
  approveds() {
    this.props.dispatch(NavigationState.pushRoute({
      key: 'Approved',
      title: 'Approved'
    }));
  },
  contacteds() {
    this.props.dispatch(NavigationState.pushRoute({
      key: 'Contacted',
      title: 'Contacted'
    }));
  },
  concernss() {
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
            width: 30,
            height: 30
          }}
        />
      <Text style={styles.linkUserButton}>
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
          onPress={this.concernss}>
          <Text style={[styles.linkBlackButton]}>
            View and edit your Concerns list
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.approveds}>
          <Text style={[styles.linkGreenButton]}>
            See your Approved list
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.avoids}>
          <Text style={styles.linkRedButton}>
            See your Avoid list
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.contacteds}>
          <Text style={styles.linkBlueButton}>
            See manufacturers contacted
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.abouts} accessible={true}>
          <Text style={styles.linkUserButton}>
            {'About IngredientInspector'}
          </Text>
        </TouchableOpacity>

      </View>
    );
  }
});

const circle = {
  borderWidth: 0,
  borderRadius: 100,
  width: 50,
  height: 50
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',

  },
  userContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    marginTop: 1,
    flex: 1,
    flexDirection: 'row'
  },
  userProfilePhoto: {
    ...circle,
    alignSelf: 'center'
  },
  counter: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  welcome: {
    textAlign: 'center',
    color: 'black',
    marginBottom: 125,
    marginTop: 100,
    padding: 125,
  },
  linkUserButton: {
    textAlign: 'center',
    color: '#AAAAAA',
    fontSize: 22
  },
  linkButton: {
    textAlign: 'center',
    color: '#888888',
    fontSize: 22
  },
  linkGreenButton: {
    textAlign: 'center',
    color: 'green',
    marginBottom: 10,
    padding: 10,
    fontSize: 22
  },
  linkRedButton: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 10,
    padding: 10,
    fontSize: 22
  },
  linkBlackButton: {
    textAlign: 'center',
    color: 'black',
    padding: 10,
    fontSize: 22
  },
  linkBlueButton: {
    textAlign: 'center',
    color: 'blue',
    marginBottom: 10,
    padding: 10,
    fontSize: 22
  }
});

export default CounterView;
