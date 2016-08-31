import * as CounterState from './CounterState';
import * as NavigationState from '../../modules/navigation/NavigationState';
import React, {PropTypes} from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ListView
} from 'react-native';

const AvoidView = React.createClass({
  propTypes: {
  },

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var avoids = this.props.avoid
    console.log("AVOID: ", avoids)
    const loadingStyle = this.props.loading
      ? {backgroundColor: '#eee'}
      : null;

    return (
      <View style={styles.container}>
        <SwipeListView
            dataSource={ds.cloneWithRows(avoids)}
            renderRow={ avoids => (
                <View style={styles.rowFront}>
                    <Text>{avoids}</Text>
                </View>
            )}
            renderHiddenRow={ ingredients_statuses=> (
                <View style={styles.rowBack}>
                    <Text>{ingredients_statuses}</Text>
                    <Text>{ingredients_warnings}</Text>
                </View>
            )}
            leftOpenValue={75}
            rightOpenValue={-75}
        />
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

export default AvoidView;
