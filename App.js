import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack'
import Tabs from './config/index';
import { NavigationContainer } from '@react-navigation/native';
import Splash from './component/splash';
import Player from './screen/player';
import Songs from './component/songs';
import Search from './screen/search';

const Stack = createStackNavigator();

function Stacks() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Player"
        component={Player}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Songs"
        component={Songs}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
        }}
      /> */}
    </Stack.Navigator>
  );
}

function MainScreen() {
  return (
      <NavigationContainer>
        <Stacks />
      </NavigationContainer>
  );
}

export default MainScreen;
