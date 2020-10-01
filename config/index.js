import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screen/home';
import Discover from '../screen/discover';
import Search from '../screen/search';
import Setting from '../screen/setting';

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Khám phá"
      tabBarOptions={{
        inactiveTintColor: 'gray',
        activeTintColor: '#000',
        tabStyle: {
          backgroundColor: '#fff',
          height: 60,
          paddingBottom: 12,
        },
      }}>
      <Tab.Screen
        name="Cá nhân"
        component={Home}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              size={28}
              color={color}
              label
            />
          ),
        }}
      />
      <Tab.Screen
        name="Khám phá"
        component={Discover}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon
              name={focused ? 'compass' : 'compass-outline'}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Tìm kiếm"
        component={Search}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon
              name={focused ? 'magnify' : 'magnify'}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cài đặt"
        component={Setting}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon
              name={focused ? 'cog' : 'cog-outline'}
              size={28}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabs;
