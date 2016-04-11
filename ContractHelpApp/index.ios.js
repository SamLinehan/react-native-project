/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

const React = require('react-native');

const {
  AppRegistry,
  CameraRoll,
  Component,
  Image,
  SliderIOS,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} = React;

const CameraRollView = require('./CameraRollView');

const AssetScaledImageExampleView = require('./AssetScaledImageExample');

const CAMERA_ROLL_VIEW = 'camera_roll_view';


// class ContractHelpApp extends Component {
const ContractHelpApp = React.createClass({

  getInitialState(){
    return {
      groupTypes: 'SavedPhotos',
      sliderValue: 1,
      bigImages: true,
    };
  },

  render() {
    return (
      // <View style={styles.container}>
      //   <Text style={styles.welcome}>
      //     Welcome to Contract Help! Dedicated to helping you solve all your home repair problems virtually.
      //   </Text>
      //   <Text style={styles.instructions}>
      //     Press Cmd+R to reload,{'\n'}
      //     Cmd+D or shake for dev menu
      //   </Text>
      // </View>
      <View>
        <switch
          onValueChange={this._onSwitchChange}
          value={this.state.bigImages} />
        <Text>{(this.state.bigImages ? 'Big' : 'Small' + ' Images')}</Text>
        <SliderIOS
          value={this.state.sliderValue}
          onValueChange={this._onSliderChange}
        />
        <Text>{'Group Type: ' + this.state.groupTypes}</Text>
        <CameraRollView
          ref={CAMERA_ROLL_VIEW}
          batchSize={20}
          groupTypes={this.state.groupTypes}
          renderImage={this._renderImage}
          />
      </View>
    );
  },

  loadAsset(asset){
    if(this.props.navigator){
      this.props.navigator.push({
        title: 'Camera Roll Image',
        component: AssetScaledImageExampleView,
        backButtonTitle: 'Back',
        passProps: {asset: asset},
      });
    }
  },

  _renderImage(asset){
    const imageSize = this.state.bigImages ? 150 : 75;
    const imageStyle = [styles.image, {width: imageSize, height: imageSize}];
    const location = asset.node.location.longitude ?
      JSON.stringify(asset.node.location) : "Unknown location";
    return (
      <TouchableOpacity key={asset} onPress={this.loadAsset.bind(this, asset)}>
        <View style={styles.row}>
          <Image
            source={asset.node.image}
            style={imageStyle}
          />
          <View style={styles.info}>
            <Text style={styles.url}>{asset.node.image.uri}</Text>
            <Text>{location}</Text>
            <Text>{asset.node.group_name}</Text>
            <Text>{new Date(asset.node.timestamp).toString()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  },

  _onSliderChange(value){
    const options = CameraRoll.groupTypesOptions;
    const index = Math.floor(value * options.length * 0.99);
    const groupTypes = options[index];
    if(groupTypes !== this.state.groupTypes){
      this.setState({groupTypes: groupTypes});
    }
  },

  _onSwitchChange(value){
    this.refs[CAMERA_ROLL_VIEW].rendererChanged();
    this.setState({bigImages: value});
  }

});
// };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
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
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  url: {
    fontSize: 9,
    marginBottom: 14,
  },
  image: {
    margin: 4,
  },
  info: {
    flex: 1,
  },
});

exports.title = 'Camera Roll';
exports.description = 'Testing Camera Roll';
exports.examples = [
  {
    title: 'Photos',
    render(): ReactElement { return <CameraRollExample />; }
  }
];


AppRegistry.registerComponent('ContractHelpApp', () => ContractHelpApp);
