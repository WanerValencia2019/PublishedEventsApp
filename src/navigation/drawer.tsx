import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import BottomTabs from './initialNavigation';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from '../components/Themed';
import React from 'react';
import { Avatar, Icon } from 'react-native-elements';
import Colors from '../constants/Colors';
import { fonts, paragraphs } from '../constants/Texts';

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
    return (
        <Drawer.Navigator
            screenOptions={{ headerShown: false, drawerType: "back" }} initialRouteName='initial'
            drawerContent={CustomDrawer}
        >
            <Drawer.Screen
                name="initial"
                component={BottomTabs}
                options={{ drawerLabel: 'Home' }}
            />
        </Drawer.Navigator>
    );
}


const CustomDrawer: React.FC<DrawerContentComponentProps> = ({ navigation, descriptors, state, children }) => {
    return (
        <View style={styles.root}>
            <View style={styles.header}>
                <Avatar size={60}
                    rounded
                    title="WA"
                    containerStyle={{ backgroundColor: Colors.blue }}
                >
                    <Avatar.Accessory onPress={() => console.log("EDITANDO")} size={20} />
                </Avatar>
                <Text style={styles.username}>WnaesVlamro</Text>
            </View>
            <View style={styles.wrapperItems}>
                <TouchableOpacity style={styles.containerTouchable}>
                    <Icon type='material-community' name='account-outline' color={Colors.darkGray} />
                    <Text style={styles.textItem}>Mi perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerTouchable}>
                    <Icon type='material-community' name='comment-outline' color={Colors.darkGray} />
                    <Text style={styles.textItem}>Mensajes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerTouchable}>
                    <Icon type='material-community' name='calendar' color={Colors.darkGray} />
                    <Text style={styles.textItem}>Calendario</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerTouchable}>
                    <Icon type='material-community' name='cog-outline' color={Colors.darkGray} />
                    <Text style={styles.textItem}>Configuraciones</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerTouchable}>
                    <Icon type='material-community' name='help-circle-outline' color={Colors.darkGray} />
                    <Text style={styles.textItem}>Preguntas frecuentes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerTouchable}>
                    <Icon type='material-community' name='email-outline' color={Colors.darkGray} />
                    <Text style={styles.textItem}>Contactanos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.containerTouchable}}>
                    <Icon type='material-community' name='logout' color={Colors.darkGray} />
                    <Text style={styles.textItem}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        marginTop: 48
    },
    header: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    username: {
        fontFamily: fonts.Roboto_500Medium,
        fontWeight: "500",
        fontSize: paragraphs.pMedium,
        color: Colors.darkBlue
    },
    wrapperItems: {
        marginTop: 20,
    },
    containerTouchable: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    textItem:{
        fontFamily: fonts.Roboto_400Regular,
        fontWeight:"400",
        fontSize: paragraphs.pMedium,
        color: Colors.darkBlue,
        marginLeft: 10
    }

})