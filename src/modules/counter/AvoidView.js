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
    avoid: PropTypes.array
  },

  avoid_product_array() {
    return (this.props.avoid).map(function(obj, index) {return obj.product})
  },

  avoid_brand_array() {
    return (this.props.avoid).map(function(obj, index) {return obj.brand})
  },

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var avoid_products = this.avoid_product_array()
    var avoid_brands = this.avoid_brand_array()
    const loadingStyle = this.props.loading
      ? {backgroundColor: '#eee'}
      : null;

    return (
      <View style={styles.container}>
        <SwipeListView
            dataSource={ds.cloneWithRows(avoid_products)}
            enableEmptySections={true}
            renderRow={ avoid_products => (
                <View style={styles.rowFront}>
                    <Text>{avoid_products}</Text>
                </View>
            )}
            renderHiddenRow={ avoid_brands=> (
                <View style={styles.rowBack}>
                    <Text>{avoid_brands}</Text>
                    <Text>{avoid_brands}</Text>
                </View>
            )}
            leftOpenValue={75}
            rightOpenValue={-75}
        />
      </View>
    )
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
  linkButton: {
    textAlign: 'center',
    color: '#CCCCCC',
    marginBottom: 10,
    padding: 5
  }
});

export default AvoidView;
