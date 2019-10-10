import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Text, ScrollView, ToastAndroid } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';

import Colores from '../../../Data/Global_Colors';
import Api from '../../../Data/Api';

import VotacionesClass from '../../Votaciones/Votaciones_Main';

var grayColor = Colores.grayColor;
var blueColor = Colores.blueColor;
var whiteColor = Colores.whiteColor;
var blackColor = Colores.blackColor;
var input = Colores.textInputColor;


const { width: WIDTH } = Dimensions.get('window');



export default class Log_in extends Component {

    static navigationOptions = {
        title: 'Iniciar Sesión',
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
        super()
        this.state = {
            showPass: true,
            press: false,

            //Valores iniciales variables input
            email: '',
            pass: '',

            //Carga de datos de la api
            url: Api.api + 'login',
            // user: [],

        }
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);

    }

    loginBtn = () => {

        fetch(this.state.url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email.toString().replace(/ /g, ''),
                password: this.state.pass.toString()
            })
        })

            .then(res => {
                if (res.status == 200) {
                    res.json().then(data => {
                        AsyncStorage.setItem('token', data.token)
                        ToastAndroid.show('Ingreso Exitoso ', ToastAndroid.SHORT)
                        this.props.navigation.navigate('Mas')
                        this.props.navigation.navigate('Inicio')
                    })

                } else {
                    ToastAndroid.show('Contraseña o Email no válidos', ToastAndroid.SHORT);
                }

            })
            .catch(err => {
                ToastAndroid.show("Error " + err.toString(), ToastAndroid.LONG);
            })

    }

    handleChangeEmail(newValue) { //Cambio estado valor input
        this.setState({ email: newValue })
    }

    handleChangePassword(newValue) { //Cambio estado valor input
        this.setState({ pass: newValue })
    }

    showPass = () => {
        this.setState({ showPass: !this.state.showPass, press: !this.state.press });
    }

    render() {
        return (
            <View style={styles.MainContainer}>
                <ScrollView>
                    <View style={styles.inputTextContainer}>
                        <View style={styles.logoContainer}>
                            {/* <Image source={logo} style={styles.logoStyle} /> */}
                            <Text style={{ fontSize: 20, color: blackColor, }}>Proyecto Propuestas Municipales</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.inputStyle}
                                placeholder={'Correo Electrónico'}
                                placeholderTextColor={whiteColor}
                                underlineColorAndroid='transparent'
                                onChangeText={this.handleChangeEmail} />
                            <Icon name='email' color={whiteColor} size={20} style={styles.inputIconStyle} />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.inputStyle}
                                placeholder={'Contraseña'}
                                secureTextEntry={this.state.showPass}
                                placeholderTextColor={whiteColor}
                                underlineColorAndroid='transparent'
                                onChangeText={this.handleChangePassword} />
                            <Icon name='lock-open' color={whiteColor} size={20} style={styles.inputIconStyle} />
                            <TouchableOpacity style={styles.eyeBtnStyle} onPress={this.showPass.bind(this)}>
                                <Icon name={this.state.press == false ? 'eye' : 'eye-with-line'} color={whiteColor} size={20} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.loginBtnStyle} onPress={this.loginBtn}>
                            <Text style={styles.textBtnStyle}>Acceder</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputIconStyle: {
        position: 'absolute',
        top: 12,
        left: 34,
    },
    eyeBtnStyle: {
        position: 'absolute',
        top: 12,
        right: 34,
    },
    textContainer: {
        alignItems: 'center',
        backgroundColor: whiteColor,
        marginTop: 20
    },
    labelStyle: {
        fontSize: 15,
        color: blackColor,
    },
    logoStyle: {
        width: 120,
        height: 76,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    inputStyle: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 5,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: input,
        color: whiteColor,
        marginHorizontal: 25,
    },
    inputContainer: {
        marginTop: 10,
    },
    inputTextContainer: {
        flex: 13,
        backgroundColor: whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
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
});