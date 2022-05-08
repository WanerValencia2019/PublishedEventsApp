import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import BottomTabs from './initialNavigation';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from '../components/Themed';
import React from 'react';
import { Avatar, Icon } from 'react-native-elements';
import Colors from '../constants/Colors';
import { fonts, paragraphs } from '../constants/Texts';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { loadProfile, logout } from '../redux/auth/actions';
import * as ImagePicker from 'expo-image-picker';
import axiosInstance from '../helpers/axiosInstance';
import { showToast } from '../redux/toast/actions';
import { startLoading, stopLoading } from '../redux/loading/actions';

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
    const  auth = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    console.log(auth);
    

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        if (!result.cancelled) {
            dispatch(startLoading())
            const base64 = result.base64;
            const data = {
                image: base64
            }
            axiosInstance(null, auth.token).post('/user/update_image_profile/', data)
                .then((res) => {
                    dispatch(loadProfile({ token: auth.token}));
                })
                .catch((err) => dispatch(showToast({ message: err.response.data.message, type: 'error' })))
                .finally(() => dispatch(stopLoading()));
        }
    };

    return (
        <View style={styles.root}>
            <View style={styles.header}>
                <Avatar size={60}
                    rounded
                    source={ auth.user.imageUrl ?  { uri: auth.user.imageUrl }:null}
                    title={auth.user.firstName?.charAt(0) || "US"}
                    containerStyle={{ backgroundColor: Colors.blue }}
                >
                    <Avatar.Accessory onPress={() => auth.token && pickImage()} size={20} />
                </Avatar>
                {
                    auth.user.firstName ?
                        <Text style={styles.username}>{auth?.user.firstName} {auth?.user.lastName}</Text>
                        :
                        <Text style={styles.username}>Usuario invitado</Text>
                }
            </View>
            <View style={styles.wrapperItems}>
                <TouchableOpacity onPress={()=> navigation.navigate("Profile")} style={styles.containerTouchable}>
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
                <TouchableOpacity onPress={()=> dispatch(logout())}  style={{...styles.containerTouchable}}>
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