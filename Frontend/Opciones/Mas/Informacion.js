import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Colores from '../../Data/Global_Colors'

var grayColor = Colores.grayColor;
var blueColor = Colores.blueColor;
var whiteColor = Colores.whiteColor;

export default class Informacion extends Component {

    static navigationOptions = {
        title: 'Información',
        headerStyle: {
            backgroundColor: whiteColor,
            elevation: 1,
            shadowOpacity: 0,
            height: 40
        },
        headerTitleStyle: {
            color: grayColor,
            fontSize: 16
        },
        // header: null
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>Información</Text>
            </View>
        );
    }

}