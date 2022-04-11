import { View, Text, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useNavigation } from '@react-navigation/native';

import styles from "./styles";
import { loadProfile, logout } from '../../redux/auth/actions';
import { Avatar, Button, Icon } from 'react-native-elements';
import Colors from '../../constants/Colors';
import { fonts, paragraphs } from '../../constants/Texts';
import MenuOptions from './menuOptions';
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get("screen");

const Profile = () => {
    const auth = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigation: any = useNavigation();


    useEffect(() => {
        dispatch(loadProfile({ token: auth.token }));
    }, [auth.isAuthenticated, auth.token]);


    console.log(auth);

    const logoutUser = () => {
        console.log("logout");
        console.log(auth);
        dispatch(logout());
    }
    const redirectToLogin = () => {
        navigation.navigate('auth');
    }

    if (!auth.isAuthenticated && !auth.token) {
        return (
            <View style={styles.notLogin}>
                <Text>No estas logueado</Text>
                <Button title="Iniciar sesión" onPress={redirectToLogin} />
            </View>
        )
    }


    return (
        <ScrollView contentContainerStyle={styles.container} >
            <View style={styles.wrapperHeader}>
                <MenuOptions />
            </View>
            <View style={{display:"flex", alignItems: "center",}}>
                <View style={styles.wrapperInfoSection}>
                    <Avatar
                        size={width * 0.25}
                        source={{ uri: auth.user.imageUrl }}
                        title={auth.user.firstName?.charAt(0)}
                        containerStyle={{ backgroundColor: Colors.blue }}
                        rounded
                    >
                        <Avatar.Accessory  onPress={() => console.log("EDITANDO")} size={width * 0.055} />
                    </Avatar>
                    <Text style={styles.nameText}>{auth.user.firstName} {auth.user.lastName}</Text>
                </View>
                <View style={styles.wrapperButtonEditProfile}>
                    <Button
                        title="Editar perfil"
                        type='outline'
                        titleStyle={{ color: Colors.blue, fontSize: paragraphs.pLarge, fontFamily: fonts.Roboto_300Light }}
                        iconPosition='left'
                        icon={<Icon type="material-community" name='account-edit-outline' size={width * 0.06} iconStyle={{ fontWeight: "100" }} color={Colors.blue} />}
                        buttonStyle={{ borderColor: Colors.blue }}
                    />
                </View>
                <View style={{ alignSelf: "flex-start", marginTop: height * 0.05 }}>
                    <View>
                        <Text style={styles.descriptionTitle}>Acerca de mi</Text>
                        <Text style={styles.description}>{auth.user.description}</Text>
                    </View>
                </View>
                <Button containerStyle={{ marginTop: 20 }} onPress={logoutUser} title="Cerrar sesión" />
            </View>
        </ScrollView>
    )
}

export default Profile;