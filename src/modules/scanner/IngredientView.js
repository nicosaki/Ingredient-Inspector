import * as CounterState from '../counter/CounterState';
import * as IngredientState from './IngredientState';
import * as NavigationState from '../../modules/navigation/NavigationState';
import React, {PropTypes} from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  RecyclerViewBackedScrollView,
  TouchableHighlight,
  ListView
} from 'react-native';

const IngredientView = React.createClass({
  propTypes: {
    barcode: PropTypes.string
    },

  contact_manufacturer() {
    var upc = this.props.barcode
    var id = this.props.user_id
    var _product = this.props.product
    var _brand = this.props.brand
    var contacted = this.props.contacted
    if (contacted !== []) {
      var new_contacted = contacted.push({product: _product, brand: _brand})
    } else {
      var new_contacted = [{product: _product, brand: _brand}]
    }
    this.props.dispatch(CounterState.updateContacted(upc, id, new_contacted));
  },

  update_avoid() {
    var upc = this.props.barcode
    var id = this.props.user_id
    var _product = this.props.product
    var _brand = this.props.brand
    var avoid = this.props.avoid
    if (avoid !== []) {
      var new_avoid = avoid.push({product: _product, brand: _brand})
    } else {
      var new_avoid = [{product: _product, brand: _brand}]
    }
    this.props.dispatch(CounterState.updateAvoid(upc, id, new_avoid));
  },

  update_approved() {
    var upc = this.props.barcode
    var id = this.props.user_id
    var _product = this.props.product
    var _brand = this.props.brand
    var approved = this.props.approved
    if (approved !== []) {
      var new_approved = approved.push({product: _product, brand: _brand})
    } else {
      var new_approved = [{product: _product, brand: _brand}]
    }
    this.props.dispatch(CounterState.updateApproved(upc, id, new_approved));
  },

  open_scanner() {
    this.props.dispatch(NavigationState.pushRoute({
      key: 'Scanner',
      title: 'SCAN A BARCODE',
      // params: {
      //   getFeedBack: function(text) {
      //     _this.setState({feedback: text});
      //   }
      // }
    }));
  },

  ingredients_name_array() {
    return (this.props.ingredients).map(function(obj, index) {return obj.name})
  },

  ingredients_status_array() {
    return (this.props.ingredients).map(function(obj, index) {return obj.status})
  },

  ingredients_warnings_array() {
    return (this.props.ingredients).map(function(obj, index) {return obj.warnings})
  },

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var upc = this.props.barcode
    console.log("BARCODE_PROP: ", upc)
    if (upc === '' || upc === null) {
      return (<View style={styles.container}><TouchableOpacity onPress={this.open_scanner}>
        <Text style={styles.linkBlackButton}>
          Scan product
        </Text>
      </TouchableOpacity></View>)
    }
    var ingredients = this.props.ingredients
    console.log("INGREDIENTS_PROP: ", ingredients)
    if (ingredients === []) {
      return (<View style={styles.container}><Text>Loading ingredients...</Text></View>)
    }
    if (ingredients === "No flagged ingredients") {
      return (<View style={styles.container}><Text>No ingredients of concern! </Text>
        <TouchableOpacity onPress={this.open_scanner}>
          <Text style={styles.linkBlackButton}>
            Scan product
          </Text>
        </TouchableOpacity>
      </View>)
    }
    if (ingredients && ingredients!== ["No ingredients added"]) {
      var ingredients_names = this.ingredients_name_array()
      var ingredients_statuses = this.ingredients_status_array()
      var ingredients_warnings = this.ingredients_warnings_array()
      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={this.open_scanner}>
            <Text style={styles.linkBlackButton}>
              Scan product
            </Text>
          </TouchableOpacity>
          <SwipeListView
              dataSource={ds.cloneWithRows(ingredients_names)}
              enableEmptySections={true}
              renderRow={ ingredients_names => (
                  <View style={styles.rowFront}>
                      <Text>{ingredients_names}</Text>
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
          <Text>Check ingredients for:</Text>
          <TouchableOpacity onPress={this.update_avoid}>
            <Text style={styles.linkRedButton, styles.floatLeft}>
              +Avoid
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.contact_manufacturer}>
            <Text style={styles.linkBlueButton}>
              Contact manufacturer
            </Text>
          </TouchableOpacity>
            <TouchableOpacity
              onPress={this.update_approved}>
              <Text style={[styles.linkGreenButton, styles.floatRight]}>
                +Approved
              </Text>
            </TouchableOpacity>
        </View>)
      } else {
      return (
        <View style={styles.container}>
        <TouchableOpacity onPress={this.open_scanner}>
          <Text style={styles.linkBlackButton}>
            Scan product
          </Text>
        </TouchableOpacity>
        <Text style={styles.userContainer}>IngredientInspector relies on Open Food Facts, a crowd-sourced database of products around the world. Unfortunately, this product or its ingredients are not in the database. You can contribute to their project to improve open-source data and improve IngredientInspector at openfoodfacts.org/data</Text>
        </View>)}

    const loadingStyle = this.props.loading
      ? {backgroundColor: '#eee'}
      : null;
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
  },
  linkUserButton: {
    textAlign: 'center',
    color: '#AAAAAA',
    marginBottom: 10,
    padding: 5,
    fontSize: 25
  },
  linkBlueButton: {
    textAlign: 'center',
    color: 'blue',
    marginBottom: 10,
    padding: 5,
    fontSize: 25
  },
  linkGreenButton: {
    textAlign: 'center',
    color: 'green',
    marginBottom: 10,
    padding: 5,
    fontSize: 25
  },
  linkRedButton: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 10,
    padding: 5,
    fontSize: 25
  },
  linkBlackButton: {
    textAlign: 'center',
    color: 'black',
    marginBottom: 10,
    padding: 5,
    fontSize:35,
    backgroundColor: '#DDDDDD',
    borderRadius: 1
  },
  floatLeft: {
    justifyContent: 'flex-start'
  },
  floatRight: {
    justifyContent: 'flex-end'
  }
});

export default IngredientView;
