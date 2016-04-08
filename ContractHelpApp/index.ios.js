/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  Image,
  SliderIOS,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

var Camera = require('react-native-camera');

// class ContractHelpApp extends Component {
var ContractHelpApp = React.createClass({

  getInitialState: function() {
      return {
          cameraType: Camera.constants.Type.back
      }
  },

  render: function() {
    return (
        <Camera
            ref="cam"
            style={styles.container}
            type={this.state.cameraType}>
            <View style={styles.buttonBar}>
                <TouchableHighlight style={styles.button} onPress={this._switchCamera}>
                    <Text style={styles.buttonText}>Flip</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} onPress={this._takePicture}>
                    <Text style={styles.buttonText}>Take</Text>
                </TouchableHighlight>
            </View>
        </Camera>
    );
},

  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.welcome}>
  //         Welcome to Contract Help! Dedicated to helping you solve all your home repair problems virtualy.
  //       </Text>
  //       <Text style={styles.instructions}>
  //         To get started, edit index.ios.js
  //       </Text>
  //       <Text style={styles.instructions}>
  //         Press Cmd+R to reload,{'\n'}
  //         Cmd+D or shake for dev menu
  //       </Text>
  //     </View>
  //     <Camera
  //       ref="cam"
  //       style={styles.container}
  //       type={this.state.cameraType}>
  //       <View style={styles.buttonBar}>
  //         <TouchableHighlight style={styles.button} onPress={this._switchCamera}>
  //           <Text style={styles.buttonText}>Flip</Text>
  //         </TouchableHighlight>
  //         <TouchableHighlight style={styles.button} onPress={this._takePicture}>
  //           <Text style={styles.buttonText}>Take</Text>
  //         </TouchableHighlight>
  //       </View>
  //     </Camera>
  //   );
  // },

  _switchCamera: function(){
    var state = this.state;
    state.cameraType = state.cameraType == Camera.constants.Type.back ? Camera.constants.Type.front : Camera.constants.Type.back;
    this.setState(state);
  },

  _takePicture: function(){
    this.refs.cam.capture(function(error, data){
      console.log(error, data);
    })
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  buttonBar: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 25,
    right: 0,
    left: 0,
    justifyContent: 'center'
  },
  button: {
    padding: 10,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    margin: 5
  },
  buttonText: {
    color: '#FFFFFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
});

AppRegistry.registerComponent('ContractHelpApp', () => ContractHelpApp);
