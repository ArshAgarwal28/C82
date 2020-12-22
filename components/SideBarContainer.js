import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import MyBarterScreen from '../screens/MyBarterScreen';
import SettingScreen from '../screens/SettingScreen';
import SignUpLoginScreen from '../screens/SignUpLoginScreen';
import { BottomTab } from './BottomTab';
import SideBarMenu from './SideBarMenu';

export const SideBarContainer = createDrawerNavigator(
	{
		Home: { screen: BottomTab },
		Settings: { screen: SettingScreen },
		MyBarters: { screen: MyBarterScreen },
	},
	{ contentComponent: SideBarMenu },
	{ initialRouteName: 'Home' }
);
