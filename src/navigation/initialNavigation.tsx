import React from 'react';
import { BottomTabBarButtonProps, BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../constants/Colors';
import Home from '../screens/home';
import NotFoundScreen from '../screens/NotFoundScreen';

import { Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import { View } from '../components/Themed';
import { useNavigation } from '@react-navigation/native';
import MapViewScreen from '../screens/mapView';
import Events from '../screens/events';
import Profile from '../screens/profile';
import CreateEvent from '../screens/createEvent';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditProfile from '../screens/editProfile';
import { fonts, headers } from '../constants/Texts';
import ListUserEvents from '../screens/ListUserEvents';
import UserDetailEvent from '../screens/UserDetailEvent';
import EventDetailMenu from '../screens/UserDetailEvent/detailMenu';
import ListEventAssistants from '../screens/ListEventAssistants';
import BillingProfile from '../screens/billingProfile';
import MyCalendar from '../screens/calendar';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    position: "relative",
                    height: 70,
                    /*left: 10,
                    right: 10,*/

                }
            }}
        >
            <Tab.Screen name="Home" component={Home}
                options={({ navigation, route }) => ({
                    title: 'Inicio',
                    ...tabBarScreenOptions("home-circle-outline")
                })}
            />
            <Tab.Screen name="EventStack" component={EventStack}
                options={({ navigation, route }) => ({
                    title: 'Eventos',
                    ...tabBarScreenOptions("calendar"),
                
                })
                }
            />
            <Tab.Screen name="AddEvent" component={CreateEvent}
                options={({ navigation, route }) => ({
                    ...tabBarScreenOptions("plus-circle-outline", Colors.blue),
                    tabBarButton: CustomBottomComponent,
                    tabBarShowLabel: false,

                })
                }
            />
            <Tab.Screen name="Map" component={MapViewScreen}
                options={({ navigation, route }) => ({
                    title: 'Mapa',
                    ...tabBarScreenOptions("google-maps")
                })
                }
            />
            <Tab.Screen name="Profile" component={ProfileStack}
                options={({ navigation, route }) => ({
                    title: 'Perfil',
                    ...tabBarScreenOptions("account")
                })
                }
            />
        </Tab.Navigator>
    );
}


const tabBarScreenOptions = (iconName: string, iconColor?: string): BottomTabNavigationOptions => ({
    tabBarIcon: ({ color }) => <Icon size={28} type="material-community" name={iconName} color={iconColor || color} />,
    tabBarActiveTintColor: Colors.blue,
    tabBarInactiveTintColor: Colors.darkGray,
    tabBarLabelStyle: {
        fontSize: 12,
        paddingBottom: 10,
    }
})

const CustomBottomComponent: React.FC<BottomTabBarButtonProps> = ({ children, onPress, to }) => {
    const navigation: any = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("AddEvent")}
            style={{
                top: -30,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <View style={{
                width: 50,
                height: 50,
                borderRadius: 45,
                display: "flex",
                justifyContent: "center",
                elevation: 10,
                backgroundColor: Colors.blue
            }}>
                <Icon size={28} type="material-community" name={"plus"} color="white" />
            </View>
        </TouchableOpacity>
    )
}

const stack = createNativeStackNavigator();

const EventStack = () => {
    return (
        <stack.Navigator initialRouteName="Events" >
            <stack.Screen name="Events" component={Events} options={{headerShown: false}}  />
            <stack.Screen name="Calendar" component={MyCalendar} options={{header:CustomHeaderCalendar}} />
        </stack.Navigator>
    )
}

const ProfileStack = () => {
    return (
        <stack.Navigator initialRouteName="ProfileView" >
            <stack.Screen name="ProfileView" component={Profile} options={{ headerShown: false }} />
            <stack.Screen name="EditProfile" component={EditProfile} options={{
                headerBackTitle: "Regresar", headerTitle: "Mi perfil", headerTitleStyle: {
                    fontFamily: fonts.Roboto_500Medium,
                    fontWeight: "500",
                    fontSize: headers.h5,
                    color: Colors.darkBlueText,
                }
            }} />
            <stack.Screen name="ListUserEvents" component={ListUserEvents} options={{
                headerBackTitle: "Regresar", headerTitle: "Mis eventos", headerTitleStyle: {
                    fontFamily: fonts.Roboto_500Medium,
                    fontWeight: "500",
                    fontSize: headers.h5,
                    color: Colors.darkBlueText,
                }
            }} />
            <stack.Screen name='UserDetailEvent' component={UserDetailEvent} options={{ header: customHeaderDetailEvent }} />
            <stack.Screen name="ListEventAssistants" component={ListEventAssistants} options={{
                headerBackTitle: "Regresar", headerTitle: "Asistentes" }} />
           <stack.Screen name="BillingProfile" component={BillingProfile} options={{
                headerBackTitle: "Regresar", headerTitle: "Perfil de pagos" }} />
        </stack.Navigator>
    )
}


const CustomHeaderCalendar = (pr:any) => {
    const { route } = pr;
    return (
        <View style={{
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 35,
            paddingBottom: 15,
            marginBottom: 5,
            paddingLeft: 10,
            paddingRight: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 18,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,
            elevation: 1,
        }}>
            <TouchableOpacity
                onPress={() => pr.navigation.navigate("Events")}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Icon size={28} type="material-community" name={"arrow-left"} color="black" />
            </TouchableOpacity>
            <Text style={{
                fontFamily: fonts.Roboto_500Medium,
                fontWeight: "500",
                fontSize: headers.h5,
                color: Colors.darkBlue,
                marginLeft: 10
            }}>Mi calendario</Text>

        </View>
    );
}

const customHeaderDetailEvent = (pr: any) => {
    const { route } = pr;
    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "white",
            elevation: 10,
            borderBottomWidth: 1,
            borderBottomColor: Colors.darkGray,
            paddingTop: 35,
            paddingBottom: 15,
            paddingLeft: 10,
            paddingRight: 10,
        }}>
            <TouchableOpacity
                onPress={() => pr.navigation.goBack()}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Icon size={28} type="material-community" name={"arrow-left"} color="black" />
            </TouchableOpacity>
            <Text style={{
                fontFamily: fonts.Roboto_500Medium,
                fontWeight: "500",
                fontSize: headers.h5,
                color: Colors.darkBlueText,
            }}>Detalle del evento</Text>

            <EventDetailMenu eventId={route?.params?.eventId}  />
        </View>
    );
}