import * as CounterState from '../counter/CounterState';
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

  contact_manufacturer(upc) {
    this.props.dispatch(CounterState.updateContacted(upc));
  },

  update_avoids(upc) {
    this.props.dispatch(CounterState.updateAvoid(upc));
  },

  update_approved(upc) {
    this.props.dispatch(CounterState.updateApproved(upc));
  },

  toggleVisibility(show) {
    if (show !== false) {
      this.setState({ showResults: false });
    } else {
      this.setState({ showResults: true})
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
    var ingredients = this.state.data.ingredients
    var upc = this.state.barcode
    var id = this.state.user_id
    const loadingStyle = this.props.loading
      ? {backgroundColor: '#eee'}
      : null;


    return (
      <View>
        <ul>
         {ingredients.map(function(ingredient, index){
             return <li key={ index }>{ingredient.name}</li>;
           })}

        </ul>

      <View style={styles.container}>

        <TouchableOpacity
          onPress={this.update_approved(upc)}>
          <Text style={[styles.linkButton, styles.green]}>
            Add this product to your Approved list
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.update_avoids(upc)}>
          <Text style={styles.linkButton, styles.red}>
            Add this product to your Avoid list
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.contact_manufacturer(upc)}>
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
