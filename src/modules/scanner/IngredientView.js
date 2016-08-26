import * as CounterState from '../counter/CounterState';
import * as IngredientState from './IngredientState';
import * as NavigationState from '../../modules/navigation/NavigationState';
import React, {PropTypes} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Switch
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
    this.props.dispatch(IngredientState.queryBarcode(upc));
  },

  get_upc() {
    this.props.dispatch(IngredientState.getUpc());
  },

  // toggleVisibility(show) {
  //   if (show !== false) {
  //     this.setState({ showResults: false });
  //   } else {
  //     this.setState({ showResults: true})
  //   }
  // },

  if_ingredients(ingredients) {
    var ingredients = this.get_ingredients(upc)
    if (ingredients.message === "No ingredients added" || !ingredients || ingredients.status === 0) {
      return "IngredientInspector relies on Open Food Facts, a crowd-sourced database of products around the world. Unfortunately, this product or its ingredients are not in the database. You can contribute to their project to improve open-source data and improve IngredientInspector at openfoodfacts.org/data"
    } else {
        <ul>
         {ingredients.map(function(ingredient, index){
             return <li key={ index }>{ingredient.name}</li>;
           })}
           //status, warnings
        </ul>
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
    var id = this.get_user_id()
    var upc = this.get_upc()
    // id = id.auth.user_id
    const loadingStyle = this.props.loading
      ? {backgroundColor: '#eee'}
      : null;



    return (
      <View onBeginProcessingChildContext={this.if_ingredients()}>

      <View style={styles.container}>

        <TouchableOpacity
          onPress={this.update_approved(upc, id)}>
          <Text style={[styles.linkButton, styles.green]}>
            Add this product to your Approved list
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.update_avoid(upc, id)}>
          <Text style={styles.linkButton, styles.red}>
            Add this product to your Avoid list
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.contact_manufacturer(upc, id)}>
          <Text style={styles.linkButton, styles.blue}>
            Contact the manufacturer
          </Text>
        </TouchableOpacity>
      </View>
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
