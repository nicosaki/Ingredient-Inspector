import * as CounterState from '../counter/CounterState';
import * as IngredientState from './IngredientState';
import * as NavigationState from '../../modules/navigation/NavigationState';
import React, {PropTypes} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Button
} from 'react-native';

const IngredientView = React.createClass({
  propTypes: {
    barcode: PropTypes.string,
    data: PropTypes.object,
    showResults: PropTypes.bool
  },

  contact_manufacturer(upc, id) {
    this.props.dispatch(CounterState.updateContacted(upc, id));
  },

  update_avoid(upc, id) {
    this.props.dispatch(CounterState.updateAvoid(upc, id));
  },

  update_approved(upc, id) {
    this.props.dispatch(CounterState.updateApproved(upc, id));
  },

  get_user_id() {
    this.props.dispatch(CounterState.getUserId());
  },

  get_ingredients(upc) {
    if (upc === null) {return null}
    this.props.dispatch(IngredientState.getIngredients(upc));
  },

  get_upc() {
    this.props.dispatch(IngredientState.getUpc());
  },

  open_scanner() {
    this.props.dispatch(NavigationState.pushRoute({
      key: 'Scanner',
      title: 'SCAN A BARCODE'
    }));
  },

  // toggleVisibility(show) {
  //   if (show !== false) {
  //     this.setState({ showResults: false });
  //   } else {
  //     this.setState({ showResults: true})
  //   }
  // },

  if_ingredients() {
    var upc = this.get_upc();
    if (upc === '') {
      return <Text></Text>
    }
    var ingredients = this.get_ingredients(upc);
    if (ingredients === null) {
      return <Text></Text>
    }
    if (ingredients.message === "No flagged ingredients") {
      return <Text>No ingredients of concern! </Text>
    }
    if (ingredients && ingredients.message !== "No ingredients added" && ingredients.status !== 0) {
      return
          <ul>
           {ingredients.map(function(ingredient, index){
               return <li key={ index }>{ingredient.name}</li>;
             })}
             //status, warnings
          </ul>
      }else {
      return <Text>IngredientInspector relies on Open Food Facts, a crowd-sourced database of products around the world. Unfortunately, this product or its ingredients are not in the database. You can contribute to their project to improve open-source data and improve IngredientInspector at openfoodfacts.org/data</Text>
    }
  },
  // update_concerns(checked) {
  //   this.props.dispatch(CounterState.updateConcerns(checked));
  // },
//   displayDetails() {
//     if (this.state.showResults) {
//       return (
//             <TouchableHighlight
//                 onPress={this.toggleCancel()}>
//                 <View>
//                     <Text style={styles.cancelButtonText}>Cancel</Text>
//                 </View>
//             </TouchableHighlight>
//         );
//     } else {
//       return null;
//     }
// }


  render() {

    // id = id.auth.user_id
    const loadingStyle = this.props.loading
      ? {backgroundColor: '#eee'}
      : null;

    return (

      <View style={styles.container}>

        <TouchableOpacity
          onPress={this.update_approved(this.get_upc(), this.get_user_id())}>
          <Text style={[styles.linkButton, styles.green]}>
            Add this product to your Approved list
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.update_avoid(this.get_upc(), this.get_user_id())}>
          <Text style={styles.linkButton, styles.red}>
            Add this product to your Avoid list
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.contact_manufacturer(this.get_upc(), this.get_user_id())}>
          <Text style={styles.linkButton, styles.blue}>
            Contact the manufacturer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.open_scanner}>
          <Text style={styles.linkButton, styles.blue}>
            Scan a product
          </Text>
        </TouchableOpacity>
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
  }
});

export default IngredientView;
