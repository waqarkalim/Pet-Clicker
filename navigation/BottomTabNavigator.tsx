/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import * as React from 'react';

import Colors from '../constants/Colors';

import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabThreeScreen from '../screens/TabThreeScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';

import { logout } from '../components/Firebase/firebase';
import { Text } from "../components/Themed";

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
import { TouchableOpacity } from 'react-native';

const BottomTab = createBottomTabNavigator();

// ==========================================================================================
// Ads stuff
// ==========================================================================================

const adTestID = "ca-app-pub-3940256099942544/2934735716"
const bannerError = (err: string) => {
  console.log(err);
  return;
}
const AdMobBannerTest = () => <AdMobBanner
  // bannerSize="smartBannerPortrait"
  bannerSize="fullBanner"
  adUnitID={adTestID} // Test ID, Replace with your-admob-unit-id
  servePersonalizedAds // true or false
  onDidFailToReceiveAdWithError={bannerError} />

// ==========================================================================================

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  async function handleSignOut() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {/* <AdMobBannerTest /> */}
      <BottomTab.Navigator
        initialRouteName="TabOne"
        tabBarOptions={{
          // activeTintColor: Colors[colorScheme].tint,
          // activeBackgroundColor: "#6B705D",
          // inactiveBackgroundColor: "#6B705D",
          activeTintColor: Colors[colorScheme].white,
          inactiveTintColor: Colors[colorScheme].lightGrey,
          activeBackgroundColor: Colors[colorScheme].secondaryNormal,
          inactiveBackgroundColor: Colors[colorScheme].secondaryLight,
          // adaptive: true,
          // safeAreaInsets: {
          //   bottom: 1,
          //   top: 1
          // },
          showLabel: false,
          tabStyle: {
            borderRadius: '100%',
            marginTop: 1,
            marginBottom: 1,
            marginLeft: 2,
            marginRight: 2
          },
          style: {
            backgroundColor: Colors[colorScheme].secondaryLight,
          }
          // // style: {
          // //   minHeight: '7%'
          // // }
        }}
      >
        <BottomTab.Screen
          name="TabOne"
          component={TabOneNavigator}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => <><Icon name="pets" size={size} color={color} /><Text>Home</Text></>,
            tabBarButton: (props) => (<TouchableOpacity  {...props} />)
          }}
        />
        <BottomTab.Screen
          name="TabTwo"
          component={TabTwoNavigator}
          options={{
            tabBarLabel: "Remove Ads",
            tabBarIcon: ({ color, size }) => <><Icon name="celebration" size={size} color={color} /><Text>Remove Ads</Text></>,
            tabBarButton: (props) => (<TouchableOpacity  {...props} />)
          }}
        />
        <BottomTab.Screen
          name="TabThree"
          component={TabThreeScreen}
          options={{
            tabBarLabel: "Sign Out",
            tabBarIcon: ({ color, size }) => <><Ionicon name="log-out" size={size} color={color} /><Text>Sign Out</Text></>,
            tabBarButton: (props) => (<TouchableOpacity  {...props} onPress={() => handleSignOut()} />)
          }}
        />
      </BottomTab.Navigator>
      <AdMobBannerTest />
    </>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  const colorScheme = useColorScheme();
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{
          headerTitleStyle: {
            textAlign: "center",
            color: Colors[colorScheme].white
          },
          headerTitle: 'Pet Clicker',
          headerStyle: {
            backgroundColor: Colors[colorScheme].secondary,
          },
        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  const colorScheme = useColorScheme();
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{
          headerTitleStyle: {
            textAlign: "center",
            color: Colors[colorScheme].white
          },
          headerTitle: 'Remove Ads for ONLY $2.99',
          headerStyle: {
            backgroundColor: Colors[colorScheme].secondary,
          },
        }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  const colorScheme = useColorScheme();
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="TabThreeScreen"
        component={TabThreeScreen}
        options={{
          headerTitleStyle: {
            textAlign: "center",
          },
          headerTitle: 'Sign out',
          headerStyle: {
            backgroundColor: '#6B705D',
          },
        }}
      />
    </TabThreeStack.Navigator>
  );
}
