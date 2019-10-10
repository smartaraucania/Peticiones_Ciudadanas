import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colores from '../../Data/Global_Colors'

var grayColor = Colores.grayColor;
var whiteColor = Colores.whiteColor;

export default class Acerca_De extends Component {

    static navigationOptions = {
        title: 'Acerca de',
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
                <View style={styles.textContainer}>
                    <Text style={styles.labelStyle}>Proyecto Propuestas Municipales</Text>
                    <Text style={styles.labelStyle}>Smart Araucanía © 2019</Text>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({

    textContainer: {
        alignItems: 'center',
        backgroundColor: whiteColor,
        marginBottom: 20,
        marginTop: 30
    },

    labelStyle: {
        fontSize: 12,
        color: grayColor,
    },

});