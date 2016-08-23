import 'es6-symbol/implement';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppViewContainer from './src/modules/AppViewContainer';
import React from 'react';
import {AppRegistry, BackAndroid, AsyncStorage} from 'react-native';
import * as NavigationStateActions from './src/modules/navigation/NavigationState';

const PepperoniAppTemplate = React.createClass({

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.navigateBack);
  },

  componentDidMount: function() {
        AsyncStorage.getItem("approved").then((value) => {
            this.setState({"approved": value});
        }).done();
        AsyncStorage.getItem("avoid").then((value) => {
            this.setState({"avoid": value});
        }).done();
        AsyncStorage.getItem("concerns").then((value) => {
            this.setState({"concerns": value});
        }).done();
        AsyncStorage.getItem("contacted").then((value) => {
            this.setState({"contacted": value});
        }).done();
        AsyncStorage.getItem("id").then((value) => {
            this.setState({"id": value});
        }).done();
    },

  navigateBack() {
    const navigationState = store.getState().get('navigationState');
    const tabs = navigationState.get('tabs');
    const tabKey = tabs.getIn(['routes', tabs.get('index')]).get('key');
    const currentTab = navigationState.get(tabKey);

    // if we are in the beginning of our tab stack
    if (currentTab.get('index') === 0) {

      // if we are not in the first tab, switch tab to the leftmost one
      if (navigationState.get('index') !== 0) {
        store.dispatch(NavigationStateActions.switchTab(0));
        return true;
      }

      // otherwise let OS handle the back button action
      return false;
    }

    store.dispatch(NavigationStateActions.popRoute());
    return true;
  },

  render() {
    return (
      <Provider store={store}>
        <AppViewContainer />
      </Provider>
    );
  }
});

AppRegistry.registerComponent('PepperoniAppTemplate', () => PepperoniAppTemplate);
