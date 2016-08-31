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
    this.props.dispatch(CounterState.updateContacted(this.props.barcode, this.props.user_id));
  },

  update_avoid() {
    this.props.dispatch(CounterState.updateAvoid(this.props.barcode, this.props.user_id, this.props.product));
  },

  update_approved() {
    this.props.dispatch(CounterState.updateApproved(this.props.barcode, this.props.user_id, this.props.product));
  },

  open_scanner() {
    this.props.dispatch(NavigationState.pushRoute({
      key: 'Scanner',
      title: 'SCAN A BARCODE',
      params: {
        getFeedBack: function(text) {
          _this.setState({feedback: text});
        }
      }
    }));
  },

  ingredients_name_array() {
    return this.props.ingredients.map(function(obj, index) {return obj.name})
  },

  ingredients_status_array() {
    return this.props.ingredients.map(function(obj, index) {if (obj.status) {return obj.status} else {return ''} })
  },

  ingredients_warnings_array() {
    return this.props.ingredients.map(function(obj, index) {if (obj.warnings) {return obj.warnings} else {return ''} })
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
      return (<View style={styles.container}><Text>No ingredients of concern! </Text></View>)
    }
    if (ingredients && ingredients.message !== "No ingredients added" && ingredients.status !== 0) {
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
        <Text>IngredientInspector relies on Open Food Facts, a crowd-sourced database of products around the world. Unfortunately, this product or its ingredients are not in the database. You can contribute to their project to improve open-source data and improve IngredientInspector at openfoodfacts.org/data</Text>
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
  }
});

export default IngredientView;
