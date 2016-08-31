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

const ApprovedView = React.createClass({
  propTypes: {
    approved: PropTypes.array
  },

  approved_product_array() {
    return (this.props.approved).map(function(obj, index) {return obj.product})
  },

  approved_brand_array() {
    return (this.props.approved).map(function(obj, index) {return obj.brand})
  },

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var approved_products = this.approved_product_array()
    var approved_brands = this.approved_brand_array()
    const loadingStyle = this.props.loading
      ? {backgroundColor: '#eee'}
      : null;

    return (
      <View style={styles.container}>
        <SwipeListView
            dataSource={ds.cloneWithRows(approved_products)}
            enableEmptySections={true}
            renderRow={ approved_products => (
                <View style={styles.rowFront}>
                    <Text>{approved_products}</Text>
                </View>
            )}
            renderHiddenRow={ approved_brands=> (
                <View style={styles.rowBack}>
                    <Text>{approved_brands}</Text>
                </View>
            )}
            leftOpenValue={75}
            rightOpenValue={-75}
        />
      </View>
    )
  }
})

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

export default ApprovedView;
