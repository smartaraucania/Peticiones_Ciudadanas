import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';

import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';

import Propuestas_Main from './Opciones/Propuestas/Propuestas_Main'
import Menu_Main from './Opciones/Mas/Mas_Main';
import Votaciones_Main from './Opciones/Votaciones/Votaciones_Main';

import Colores from './Data/Global_Colors'

import Icon from 'react-native-vector-icons/FontAwesome5';

var menuIcon = 'list';
var proposalIcon = 'compass';
var voteIcon = 'vote-yea';

var grayColor = Colores.grayColor;
var blueColor = Colores.blueColor;
var whiteColor = Colores.whiteColor;

const TabNavigator = createMaterialTopTabNavigator({
  Menu: {
    screen: Menu_Main,
    navigationOptions: {
      tabBarLabel: 'Menú',
      tabBarIcon: ({ tintColor }) => (
        <Icon name={menuIcon} color={tintColor} size={18} style={{ bottom: 5 }} />
      ),
    }
  },
  Propuestas: {
    screen: Propuestas_Main,
    navigationOptions: {
      tabBarLabel: 'Propuestas',
      tabBarIcon: ({ tintColor }) => (
        <Icon name={proposalIcon} color={tintColor} size={21} style={{ bottom: 5 }} />
      ),
    }
  },
  Votaciones: {
    screen: Votaciones_Main,
    navigationOptions: {
      tabBarLabel: 'Votaciones',
      tabBarIcon: ({ tintColor }) => (
        <Icon name={voteIcon} color={tintColor} size={21} style={{ bottom: 5 }} />
      ),
    },
  }
}, {
    initialRouteName: 'Propuestas',
    order: ['Menu', 'Propuestas', 'Votaciones'],
    navigationOptions: {
      tabBarVisible: false,
    },
    tabBarOptions: {
      activeTintColor: whiteColor,
      inactiveTintColor: '#ececec',
      pressColor: whiteColor,
      showIcon: true,
      showLabel: false,
      animation: [],
      style: {
        backgroundColor: blueColor,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.065,
      },
      indicatorStyle: {
        backgroundColor: whiteColor,
      }
    },
  });

export default createAppContainer(TabNavigator);