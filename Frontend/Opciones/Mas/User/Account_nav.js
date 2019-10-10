import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';

import Colores from '../../../Data/Global_Colors';

var grayColor = Colores.grayColor;
var blueColor = Colores.blueColor;
var whiteColor = Colores.whiteColor;
var blackColor = Colores.blackColor;

const { width: WIDTH } = Dimensions.get('window');


export default class Account_nav extends Component {

  static navigationOptions = {
    title: 'Mi Cuenta',
    headerStyle: {
      backgroundColor: whiteColor,
      elevation: 1,
      shadowOpacity: 0,
      height: 40
    },
    headerTitleStyle: {
      color: grayColor,
      fontSize: 16
    }
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <View style={styles.textContainer}>
          <Text style={{ fontSize: 20, color: blackColor, }}>Proyecto Propuestas Municipales</Text>
        </View>
        <View style={styles.btnContainer}>
          <View style={styles.logoContainer}>
          </View>
          <TouchableOpacity style={styles.loginBtnStyle} onPress={() => { this.props.navigation.navigate('Login') }}>
            <Text style={styles.textBtnStyle}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginBtnStyle} onPress={() => { this.props.navigation.navigate('Checkin') }}>
            <Text style={styles.textBtnStyle}>Registrarse</Text>
          </TouchableOpacity>
        </View >
        <View style={styles.textContainer}>
          <Text style={styles.labelStyle}>Proyecto Propuestas Municipales</Text>
          <Text style={styles.labelStyle}>Smart Araucanía © 2019</Text>
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: whiteColor
  },
  
  textContainer: {
    alignItems: 'center',
    backgroundColor: whiteColor,
    marginBottom: 20,
    marginTop: 30
  },
  btnContainer: {
    flex: 13,
    backgroundColor: whiteColor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginBtnStyle: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 5,
    backgroundColor: blueColor,
    justifyContent: 'center',
    marginTop: 20,
  },
  textBtnStyle: {
    color: whiteColor,
    fontSize: 16,
    textAlign: 'center',
  },
  logoStyle: {
    width: 120,
    height: 76,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  }
});