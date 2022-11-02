/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import { RootStackParamList } from '../../types';
import LinkingConfiguration from './LinkingConfiguration';
import Login from '../screens/auth/Initial';
import DrawerNav from './drawer';
import Auth from '../screens/auth/Initial';
import EventDetail from '../screens/eventDetail';
import ViewTickets from '../screens/viewTickets';
import ConfirmInfoBuy from '../screens/ConfirmInfoBuy';
import PayWebView from '../screens/PayWebview';
import ComingSoon from '../screens/ComingSoon';
import ContactUs from '../screens/contactUs';

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
        <Stack.Screen
          name="ContactUsStack"
          component={ContactUSNavigator}
          options={{ headerTitle: "Contactanos" }}
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
      <Stack.Screen name='ComingSoon' component={ComingSoon} options={{ headerShown: false, headerBackVisible: true, headerBackTitle: 'Regresar' }} />
    </Stack.Navigator>
  );
}

function ContactUSNavigator() {
  return (
    <Stack.Navigator initialRouteName='ContactUs'>
      <Stack.Screen name='ContactUs' component={ContactUs} options={{ headerShown: false, headerBackVisible: true, headerBackTitle: 'Regresar' }} />
    </Stack.Navigator>
  );
}
