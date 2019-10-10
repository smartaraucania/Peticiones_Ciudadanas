import React, { Component } from 'react';
import { View } from 'react-native';
import { YellowBox } from 'react-native';

import Navigator from './Navigator';
import Perfil from './Opciones/Mas/User/Perfil'

YellowBox.ignoreWarnings([
  'ViewPagerAndroid',
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Module RCTImageLoader requires',
]);

export default class App extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <Perfil></Perfil> */}
        <Navigator></Navigator>
      </View>
    );
  }
}