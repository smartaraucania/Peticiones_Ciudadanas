
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    RefreshControl,
    TouchableOpacity,
    ScrollView,
    Text,
    ToastAndroid,
    FlatList
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

import Api from '../../Data/Api';
import PropuestasTipo from '../../Data/Categorias';
import Colores from '../../Data/Global_Colors'

var grayColor = Colores.grayColor;
var softGray = Colores.softGrayColor;
var blueColor = Colores.blueColor;
var whiteColor = Colores.whiteColor;
var lineHeight = 1;

class Votaciones_Main extends Component {

    static navigationOptions = {
        title: 'Mis Votaciones',
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

    constructor() {
        super()
        this.state = {
            listType: PropuestasTipo,
            showDetail: false,
            proposalType: 'Filtrar Categoría',

            //Carga de datos de la api
            loading: false,
            fullList: [],
            list: [],
            url: Api.api + 'user',
            token: '',
        }
    }

    // shouldComponentUpdate(nextProps, nextState){
    //    if(this.props.close !== nextProps.close){
    //         return true;
    //    }
    //    return false;
    //  }

    componentDidMount = async () => {
        this.getData();
    }

    // métodos para cargar datos del usuario.
    //----------------------------------------------------
    getData = async () => {

        await this.getToken();
        if (this.state.token == null || this.state.token == '') {
            ToastAndroid.show('No has iniciado Sesión', ToastAndroid.SHORT)
        } else {
            await this.loadUserData();
        }
    }

    getToken = async () => {
        try {
            var token = await AsyncStorage.getItem('token')
            // console.log(token)
            // this.setState({ token: token })
        } catch (e) {
            console.log(e)
        }
        this.setState({ token: token })
    }

    loadUserData = () => {

        if (this.state.list.length == 0) {
            fetch(this.state.url, {
                method: 'get',
                headers: {
                    'Authorization': 'bearer ' + this.state.token
                }
            })
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        list: res.user.propuestasApoyadas,
                        fullList: res.user.propuestasApoyadas
                    })
                })
        }
    }

    _onRefresh = async () => {
        await this.getData();
        this.setState({ refreshing: true });
        if (this.state.token == null || this.state.token == '') {
            //ToastAndroid.show(this.state.token + " Token", ToastAndroid.SHORT)
            this.setState({
                list: [],
                fullList: []
            })
            this.setState({ refreshing: false });
        } else {
            fetch(this.state.url, {
                method: 'get',
                headers: {
                    'Authorization': 'bearer ' + this.state.token
                }
            })
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        list: res.user.propuestasApoyadas,
                        fullList: res.user.propuestasApoyadas,
                        refreshing: false,
                        proposalType: this.state.proposalType = 'Todos'
                    })
                    this.search(this.state.proposalType);
                })//fin fetch

        }
        this.setState({ refreshing: false });
    }

    //--------------------------------------------------------

    search(txt) { // metodo de busqueda por categoría, verifica la existencia de propuestas por categoría
        var cont = 0;
        if (txt == 'Todos') {
            this.setState({ list: this.state.list = this.state.fullList })
            this.setState({ empty: this.state.empty = false })
        } else {
            let filterTracks = this.state.fullList.filter(item => {
                if (item.categoria.toLowerCase().match(txt.toLowerCase())) {
                    cont++
                    this.setState({ empty: this.state.empty = false })
                    return item
                }
                if (cont == 0) {
                    this.setState({ empty: this.state.empty = true })
                }
            })
            this.setState({ list: this.state.list = filterTracks })
        }
    }

    ShowDetail = () => {
        this.setState({ showDetail: !this.state.showDetail });
    };

    categoria(category) {
        switch (category) {
            case PropuestasTipo[0].category:
                return (PropuestasTipo[0].icon);

            case PropuestasTipo[1].category:
                return (PropuestasTipo[1].icon);

            case PropuestasTipo[2].category:
                return (PropuestasTipo[2].icon);

            case PropuestasTipo[3].category:
                return (PropuestasTipo[3].icon);

            case PropuestasTipo[4].category:
                return (PropuestasTipo[4].icon);

            case PropuestasTipo[5].category:
                return (PropuestasTipo[5].icon);

            case PropuestasTipo[6].category:
                return (PropuestasTipo[6].icon);

            default:
                return (PropuestasTipo[6].icon);
        }
    }

    parseData() {

        if (this.state.list && !this.state.empty) {
            return (
                <View style={styles.FragmentStyle}>
                    <FlatList
                        data={this.state.list}
                        renderItem={
                            ({ item }) => {
                                return (
                                    <View item={item} parentFlatList={this} style={styles.listContainer} >

                                        < View style={styles.listStyleRow} >
                                            <IconMaterial name={this.categoria(item.categoria)} color={blueColor} size={20} />
                                            <Text style={styles.typePetitionStyle}>{item.categoria}</Text>
                                        </View>

                                        <View style={styles.listStyle} >
                                            <View style={{ height: lineHeight, width: "100%", backgroundColor: softGray }} />
                                            <Text style={styles.titleTextStyle}>{item.title}</Text>
                                            <View style={{ height: lineHeight, width: "60%", backgroundColor: softGray }} />
                                            <Text style={styles.infoTextStyle}>{item.descripcion}</Text>
                                            <View style={{ height: lineHeight, width: "100%", backgroundColor: softGray }} />
                                        </View>

                                        <View style={styles.listStyleRowAdd}>
                                            <Text style={styles.addInfoTextStyle}>
                                                <IconMaterial name='account-multiple' color={blueColor} size={15} />
                                                &nbsp;&nbsp;&nbsp;Votos: 99</Text>
                                        </View>

                                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Vot', { data: item }) }}
                                            style={styles.buttonListStyles}>
                                        </TouchableOpacity >

                                    </View >
                                );
                            }
                        }
                        keyExtractor={(item, index) => index.toString()} />

                </View>)
        } else {
            return (
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={{ height: lineHeight, width: "90%", backgroundColor: softGray, marginBottom: 10, marginTop: 5 }} ></View>
                    <View style={styles.textContainer}>
                        <Text style={styles.labelStyle}>Nada que mostrar</Text>
                    </View>
                </View>
            )
        }

    }

    selectType() {
        return (
            <TouchableOpacity onPress={() => this.ShowDetail()}>
                < View style={styles.typeRowStyle} >
                    <Text style={styles.typeSelectorStyle}>{this.state.proposalType}</Text>
                    <IconMaterial name='menu-down' color={grayColor} size={30} style={{ top: 8 }} />
                </View>
                {this.state.showDetail ? (
                    <View style={styles.MainContainer}>
                        <View style={styles.FragmentStyle}>
                            {/* <View style={{ height: lineHeight, width: "100%", backgroundColor: whiteColor, marginTop: 15, marginBottom: 10, elevation: 1 }} /> */}
                            <FlatList data={this.state.listType} renderItem={({ item, index }) => {
                                return (
                                    <View item={item} index={index} parentFlatList={this} style={styles.containerFlat}>
                                        <IconMaterial name={item.icon} color={grayColor} size={30} style={{ bottom: 2 }} />
                                        < View style={{ flex: 1, flexDirection: 'column', marginLeft: 12, justifyContent: 'center', }} >
                                            <Text style={{ fontSize: 15, color: grayColor, marginBottom: 5 }}> {item.category}</Text>
                                        </View >
                                        <TouchableOpacity onPress={() => {
                                            this.setState({ proposalType: this.state.proposalType = item.category });
                                            this.search(this.state.proposalType);
                                            this.ShowDetail()
                                        }}
                                            style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                                        </TouchableOpacity >
                                    </View >);
                            }} keyExtractor={item => item.id.toString()} />
                        </View>
                    </View>) : null}
                {/* <View style={{ height: lineHeight, width: "100%", backgroundColor: whiteColor, marginTop: 15, marginBottom: 10, elevation: 0.5 }} /> */}
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.MainContainer}>
                <View style={styles.FragmentStyle}>
                    <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />}>
                        {this.selectType()}
                        <View>
                            {this.parseData()}
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
    },
    FragmentStyle: {
        flex: 18,
        marginBottom: 10
        // backgroundColor: whiteColor,
    },

    // Estilos de Lista
    listContainer: {
        flex: 1,
        // flexDirection: 'row',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 8,
        marginBottom: 8,
        // borderRadius: 5,
        backgroundColor: whiteColor,
        // borderColor: blueColor,
        // borderWidth: 2,
        elevation: 2,
        borderRadius: 5
    },
    titleTextStyle: {
        fontSize: 20,
        fontStyle: 'normal',
        marginTop: 5,
        marginBottom: 10,
        color: grayColor
    },
    infoTextStyle: {
        fontSize: 18,
        fontStyle: 'normal',
        marginTop: 5,
        marginBottom: 10,
        color: grayColor,
        textAlign: 'justify',
    },
    typePetitionStyle: {
        fontSize: 18,
        color: blueColor,
        marginBottom: 5,
        marginLeft: 10,
    },
    addInfoTextStyle: {
        fontSize: 11,
        fontStyle: 'italic',
        marginTop: 5,
        color: blueColor,
        elevation: 0.2,
        padding: 7,
        borderRadius: 5,
        borderColor: softGray,
        backgroundColor: softGray
    },
    listStyle: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        marginEnd: 10,
        justifyContent: 'center',
    },
    listStyleRow: {
        flex: 1,
        marginLeft: 12,
        flexDirection: 'row',
        marginBottom: 5,
    },
    listStyleRowAdd: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: 15,
        marginLeft: 20
    },
    typeRowStyle: {
        flex: 1,
        marginLeft: 12,
        flexDirection: 'row',
        marginBottom: 5,
        justifyContent: 'center',
        elevation: 2,
    },
    RowContainer: {
        flex: 1,
        marginLeft: 12,
        flexDirection: 'row',
    },
    buttonListStyles: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    typeSelectorStyle: {
        alignContent: 'center',
        alignSelf: 'center',
        color: grayColor,
        fontSize: 15,
        marginTop: 15,
        marginBottom: 10
    },
    containerFlat: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 2,
        marginBottom: 2,
        borderRadius: 5,
        backgroundColor: whiteColor,
        borderColor: softGray,
        borderWidth: 1,
    },
    //Estilos lista vacia
    textContainer: {
        flex: 1,
        backgroundColor: whiteColor,
        marginBottom: 20,
        marginTop: 30,
        alignItems: 'center'
    },
    labelStyle: {
        fontSize: 12,
        color: grayColor,
    },
    //Estilo de imagen de lista vacía
    imagenContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

import misVotaciones from './Votaciones_Extend';

const AppNavigator = createStackNavigator({
    Inicio: { screen: Votaciones_Main },
    Vot: { screen: misVotaciones },
});

export default createAppContainer(AppNavigator);
