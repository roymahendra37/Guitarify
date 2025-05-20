import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Whislist from '../screens/Whislist';
import Profile from '../screens/Profile';
import AddGuitar from '../screens/AddGuitar';
import { NavigationContainer } from '@react-navigation/native';
import { Home as HomeIcon, Heart, Profile as ProfileIcon } from 'iconsax-react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: true,
          tabBarIcon: ({ focused, color, size }) => {
            let IconComponent;
  
            if (route.name === 'Home') {
              IconComponent = HomeIcon;
            } else if (route.name === 'Whislist') {
              IconComponent = Heart;
            } else if (route.name === 'Profile') {
              IconComponent = ProfileIcon;
            }
  
            return (
              <IconComponent
                size={size ?? 24}
                color={focused ? '#007AFF' : '#8e8e93'}
                variant={focused ? 'Bold' : 'Linear'}
              />
            );
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#8e8e93',
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Whislist" component={Whislist} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  };

  const Router = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
          
          <Stack.Screen
            name="AddGuitar"
            component={AddGuitar}
            options={{ title: 'Tambah Gitar' }} // Judul header
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

export default Router;
