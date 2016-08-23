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

const AboutView = React.createClass({

  renderAbout() {

    return (
      <View style={styles.aboutContainer}>
        <Text>
          Ingredient Inspector was created by Nicole Iwasaki as a capstone project for Ada Developers Academy Cohort 5. See github.com/nicosaki for source code and other projects.
          </Text>
          <Text>
          The ingredient database is an aggregation of information including data compiled by e-additives.vexelon.net.
          </Text>
          <Text>
          Contains information from Open Food Facts, which is made available
          at (world.openfoodfacts.org/data) under the Open Database License (ODbL).
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
        {this.renderAbout()}
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
  aboutContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: .15
  },
  linkButton: {
    textAlign: 'center',
    color: '#CCCCCC',
    marginBottom: 10,
    padding: 5
  }
});

export default AboutView;
