import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Switch } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import Dialog from "react-native-dialog";

import Colores from '../../Data/Global_Colors';
import Api from '../../Data/Api';

import VotacionesClass from '../Votaciones/Votaciones_Main';

var grayColor = Colores.grayColor;
var blueColor = Colores.blueColor;
var whiteColor = Colores.whiteColor;
var softGray = Colores.softGrayColor;

class Mas_Main extends Component {

  static navigationOptions = {
    title: 'Más',
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

  constructor() {
    super();
    this.state = {
      switchValue: false,
      dialogVisible: false,
      sesion: false,
      loading: false,

      //variables de la API
      token: '',
      url: Api.api + 'user',
      user: [],
    }
  }

  //-----------------------------------------
  getData = async () => {

    try {
      var token = await AsyncStorage.getItem('token')
    } catch (e) {
      console.log(e)
    }
    this.setState({ token: token })
  }

  loadUser = () => {

    //this.setState({ loading: true })

    if (this.state.token == null || this.state.token == '') {

      this.getData()

    } else {

      if (this.state.user.length == 0) {
        fetch(this.state.url, {
          method: 'get',
          headers: {
            'Authorization': 'bearer ' + this.state.token
          }
        })
          .then(res => res.json())
          .then(res => {
            this.setState({ user: res.user })
          })
      }

    }

    //this.setState({ loading: false })

  }

  logOut() {
    AsyncStorage.removeItem('token')
    this.setState({ token: this.state.token = '' })
    console.log(this.state.token)
  }

  //----------------------------------------------

  showDialog = () => {
    if (this.state.token) {
      this.setState({ dialogVisible: true });
    } else {
      this.setState({ sesion: true })
    }

  };

  handleCancel = () => {
    this.setState({
      dialogVisible: false,
      sesion: false
    });
  };

  handleAccept = () => {
    this.logOut();
    this.setState({ dialogVisible: false });
  };

  //------------------------------------------------

  render() {

    this.loadUser();

    var iconSize = 20;

    return (
      <View style={styles.MainContainer}>

        <View >
          <TouchableOpacity onPress={() => {

            if (this.state.token) {
              this.props.navigation.navigate('Perfil', { usuario: this.state.user })
            } else {
              this.props.navigation.navigate('Account')
            }
          }}>
            <Text style={styles.textStyleMain}>Cuenta</Text>
            <Icon name='md-contact' size={30} color={blueColor} style={styles.iconStyleCuenta}></Icon>
          </TouchableOpacity>
        </View>

        <View style={styles.lineContainer}>
          <View style={styles.lineaOptionStyle} />
        </View>

        <View style={{ flexDirection: 'row' }}>

          <View style={{ flex: 1 }}>
            <Text style={styles.textStyle}>{this.state.switchValue ? 'Notificaciones on' : 'Notificaciones off'}</Text>
            <Icon name='ios-notifications' size={iconSize} color={blueColor} style={styles.iconStyle}></Icon>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Switch
              value={this.state.switchValue}
              onValueChange={(switchValue) => this.setState({ switchValue })}
              trackColor={{ true: blueColor, false: null }}
              thumbColor={blueColor}
              top={-3}
              left={35}
            />
          </View>

        </View>

        <View style={styles.lineContainerVariante}>
          <View style={styles.lineaOptionStyle} />
        </View>

        <View >
          <TouchableOpacity onPress={() => { this.props.navigation.navigate('Acerca') }}>
            <Text style={styles.textStyle}>Acerca de</Text>
            <Icon name='ios-help-circle' size={iconSize} color={blueColor} style={styles.iconStyle}></Icon>
          </TouchableOpacity>
        </View>

        <View style={styles.lineContainer}>
          <View style={styles.lineaOptionStyle} />
        </View>

        <View >
          <TouchableOpacity onPress={() => { this.props.navigation.navigate('Info') }}>
            <Text style={styles.textStyle}>Información</Text>
            <Icon name='md-information-circle' size={iconSize} color={blueColor} style={styles.iconStyle}></Icon>
          </TouchableOpacity>
        </View>

        <View style={styles.lineContainer}>
          <View style={styles.lineaOptionStyle} />
        </View>

        <View >
          <TouchableOpacity onPress={this.showDialog}>

            <Text style={styles.textStyle}>Cerrar sesión</Text>
            <Icon name='md-log-out' size={iconSize} color={blueColor} style={styles.iconStyle}></Icon>

            <Dialog.Container visible={this.state.dialogVisible}>
              <Dialog.Title>Cerrar Sesión</Dialog.Title>
              <Dialog.Description>¿Deseas cerrar sesión?</Dialog.Description>
              <Dialog.Button label="Cancelar" onPress={this.handleCancel} />
              <Dialog.Button label="Aceptar" onPress={this.handleAccept} />
            </Dialog.Container>

            <Dialog.Container visible={this.state.sesion}>
              <Dialog.Title>No Has Iniciado Sesión</Dialog.Title>
              <Dialog.Description>Para cerrar la sesión debes haber ingresado con tus credenciales.</Dialog.Description>
              <Dialog.Button label="Aceptar" onPress={this.handleCancel} />
            </Dialog.Container>

          </TouchableOpacity>
        </View>

        <View style={styles.lineContainer}>
          <View style={styles.lineaOptionStyle} />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 20
  },
  optionsContainer: {
    flex: 1
  },
  lineaOptionStyle: {
    height: 0.7,
    width: "90%",
    backgroundColor: softGray
  },

  lineContainerVariante: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 20
  },

  lineContainer: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  textStyle: {
    fontSize: 18,
    color: grayColor,
    paddingLeft: 50,
  },
  textStyleMain: {
    fontSize: 18,
    color: grayColor,
    paddingLeft: 50,
  },
  iconStyle: {
    position: 'absolute',
    left: 12,
    top: 0,
  },

  iconStyleCuenta: {
    position: 'absolute',
    left: 12,
    top: -4,
  },
});

import Account_nav from './User/Account_nav';
import Log_in from './User/Log_in';
import Sign_up from './User/Sign_up';
import Acerca_de from './Acerca_De';
import Informacion from './Informacion';
import Perfil from './User/Perfil';


const AppNavigator = createStackNavigator({
  Mas: { screen: Mas_Main },
  Account: { screen: Account_nav },
  Login: { screen: Log_in },
  Checkin: { screen: Sign_up },
  Acerca: { screen: Acerca_de },
  Info: { screen: Informacion },
  Perfil: { screen: Perfil }

});

export default createAppContainer(AppNavigator);