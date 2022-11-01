/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../../types';
import LinkingConfiguration from './LinkingConfiguration';
import Login from '../screens/auth/Initial';
import BottomTabs from './initialNavigation';
import DrawerNav from './drawer';
import Auth from '../screens/auth/Initial';
import EventDetail from '../screens/eventDetail';
import ShowTicketTypes from "../screens/showTicketTypes";
import ViewTickets from '../screens/viewTickets';
import ConfirmInfoBuy from '../screens/ConfirmInfoBuy';
import PayWebView from '../screens/PayWebview';
import ComingSoon from '../screens/ComingSoon';
import Calendar from '../screens/calendar';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName='Drawer'>
        <Stack.Screen
          name="auth"
          component={Auth}
          options={{ headerShown: true, headerBackTitle: "Retroceder", title: "", headerTransparent: true, }}
        />
        <Stack.Screen
          name="Drawer"
          component={DrawerNav}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventDetailStack"
          component={EventDetailNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ComingSoonStack"
          component={OtherNavigator}
           options={{ headerTitle: "Coming Soon" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName='initial'>
      <Stack.Screen name='auth' component={Login} options={{ headerShown: true, headerBackTitle: "Retroceder", title: "", headerTransparent: true, }} />
    </Stack.Navigator>
  );
}

function EventDetailNavigator() {
  return (
    <Stack.Navigator initialRouteName='eventDetail'>
      <Stack.Screen name='eventDetail' component={EventDetail} options={{ headerShown: true, headerBackTitle: "Retroceder", title: "Detalle de evento", headerTransparent: true, headerTitleStyle: { color: "white" }, headerTintColor: "white" }} />
      <Stack.Screen name='eventTicketTypes' component={ViewTickets} options={{ headerShown: true, headerBackTitle: "Retroceder", title: "Entradas disponibles" }} />
      <Stack.Screen name='eventConfirmInfoBuy' component={ConfirmInfoBuy} options={{ headerShown: true, headerBackTitle: "Retroceder", title: "Confirmar compra" }} />
      <Stack.Screen name='eventPayWebView' component={PayWebView} options={{ headerShown: true, headerBackVisible: false, headerBackTitle: "Retroceder", title: "Finalizar compra" }} />
    </Stack.Navigator>
  );
}

function OtherNavigator() {
  return (
    <Stack.Navigator initialRouteName='ComingSoon'>
      <Stack.Screen name='ComingSoon' component={ComingSoon} options={{ headerShown: false, headerBackVisible:true, headerBackTitle: 'Regresar' }} />
    </Stack.Navigator>
  );
}

