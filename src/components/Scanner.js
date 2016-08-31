import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Vibration,
  View
} from 'react-native';
import BarcodeScanner from 'react-native-barcodescanner';
import * as NavigationState from '../modules/navigation/NavigationState';
import * as IngredientState from '../modules/scanner/IngredientState';
import * as ScannerState from '../modules/scanner/ScannerState';



class Scanner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      barcode: '',
      cameraType: 'back',
      text: 'Scan Barcode',
      torchMode: 'off',
      type: '',
    };
  }

  // popBack() {
  //   this.props.dispatch(NavigationState.popRoute());
  // }

  barcodeReceived(e) {
    let id = this.props.user_id
    if (e.data !== this.state.barcode || e.type !== this.state.type) Vibration.vibrate();

    // this.setState({
    //   barcode: e.data,
    //   text: `${e.data} (${e.type})`,
    //   type: e.type,
    //   loading: true
    // });
    this.props.dispatch(ScannerState.saveBarcode(e.data))
    IngredientState.queryBarcode(e.data, id, this.props.dispatch)
    this.props.dispatch(NavigationState.popRoute())
    this.props.dispatch(NavigationState.pushRoute({
      key: 'Ingredients',
      title: 'Check Ingredients'
    }));
  }

  render() {
    return (
      <View style={styles.container}>
        <BarcodeScanner
          onBarCodeRead={this.barcodeReceived.bind(this)}
          style={{ flex: 1 }}
          torchMode={this.state.torchMode}
          cameraType={this.state.cameraType}
        />
        <View style={styles.statusBar}>
          <Text style={styles.statusBarText}>{this.state.text}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBarText: {
    fontSize: 20,
  },
});

AppRegistry.registerComponent('Scanner', () => Scanner);

export default Scanner;
