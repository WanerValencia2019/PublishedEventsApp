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
            <Tab.Screen name="Events" component={Events}
                options={({ navigation, route }) => ({
                    title: 'Eventos',
                    ...tabBarScreenOptions("calendar")
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
        </stack.Navigator>
    )
}

