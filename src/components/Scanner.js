import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Vibration,
  View
} from 'react-native';
import BarcodeScanner from 'react-native-barcodescanner';

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

  ingredients() {
    this.props.dispatch(NavigationState.pushRoute({
      key: 'Ingredients',
      title: 'Ingredients of Potential Concern'
    }));
  }

  barcodeReceived(e) {
    if (e.data !== this.state.barcode || e.type !== this.state.type) Vibration.vibrate();

    this.setState({
      barcode: e.data,
      text: `${e.data} (${e.type})`,
      type: e.type,
    });
    if (this.state.barcode) {
      ingredients();
    }
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
