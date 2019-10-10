import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Text, ScrollView, Image, ToastAndroid } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';

import Colores from '../../../Data/Global_Colors';
import Api from '../../../Data/Api';

//import AsyncStorage from '@react-native-community/async-storage';

var input = Colores.textInputColor;
var grayColor = Colores.grayColor;
var softGray = Colores.softGrayColor;
var whiteColor = Colores.whiteColor;
var blueColor = Colores.blueColor;
var tam = 150;
var iconSize = 20;

const { width: WIDTH } = Dimensions.get('window');

export default class Perfil extends Component {

    static navigationOptions = {
        title: 'Perfil',
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

            loading: false,
            list: [],
            url: Api.api + 'user',

            //refreshing
            refreshing: false,

            //campos iniciales perfil
            name: '',
            email: '',

        }
    }

    componentDidMount() {
        //ToastAndroid.show('Queeee tal!! ', ToastAndroid.SHORT)
    }

    render() {
        var user = this.props.navigation.state.params.usuario

        return (
            <View style={styles.MainContainer}>
                <ScrollView>

                    <View style={styles.imagenContainer}>
                        <Image source={{ uri: 'https://png.pngtree.com/svg/20161027/631929649c.png' }} style={styles.imagenStyle} />
                    </View>

                    <View style={styles.lineContainer}>
                        <View style={styles.lineaOptionStyle} />
                    </View>

                    <View >
                        <Text style={styles.textStyle}>Nombre</Text>
                        <TextInput
                            style={styles.inputStyle}
                            //placeholder={'Juan Alberto'}
                            placeholderTextColor={blueColor}
                            underlineColorAndroid='transparent'
                            defaultValue={user.displayName} />
                        <Icon name='v-card' color={blueColor} size={iconSize} style={styles.inputIconStyle} />

                    </View>

                    <View >
                        <Text style={styles.textStyle}>Dirección E-mail</Text>
                        <TextInput
                            style={styles.inputStyle}
                            //placeholder={'juanalbertomail@elmail.pe'}
                            placeholderTextColor={blueColor}
                            underlineColorAndroid='transparent'
                            defaultValue={user.email} />
                        <Icon name='email' color={blueColor} size={iconSize} style={styles.inputIconStyle} />
                    </View>

                    <View>
                        <Text style={styles.textStyle}>Contraseña</Text>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder={'•••••••'}
                            secureTextEntry={true}
                            placeholderTextColor={blueColor}
                            underlineColorAndroid='transparent' />
                        <Icon name='key' color={blueColor} size={iconSize} style={styles.inputIconStyle} />
                    </View>

                    <View style={styles.lineContainer}>
                        <View style={styles.lineaOptionStyle} />
                    </View>

                    <TouchableOpacity>
                        <View style={{ alignItems: 'flex-end', marginTop: 20, marginEnd: 20 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: blueColor, fontSize: 20, marginBottom: 30 }}>Guardar</Text>
                                <Icon name='triangle-right' color={blueColor} size={40} style={styles.iconStyle} />
                            </View>
                        </View>
                    </TouchableOpacity>


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

    inputStyle: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 5,
        fontSize: 16,
        paddingLeft: 40,
        backgroundColor: softGray,
        color: blueColor,
        marginHorizontal: 25,
    },

    inputIconStyle: {
        position: 'absolute',
        left: 34,
        top: 57,
    },

    iconStyle: {
        bottom: 8
    },

    imagenStyle: {
        marginTop: 15,
        width: tam,
        height: tam,
        borderColor: softGray,
        borderWidth: 2,
        borderRadius: 200
    },

    imagenContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    lineaOptionStyle: {
        height: 1,
        width: "90%",
        backgroundColor: softGray
    },

    lineContainer: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },

    textStyle: {
        fontSize: 18,
        color: grayColor,
        paddingLeft: 50,
        marginBottom: 5,
        marginTop: 20
    },
})