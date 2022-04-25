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

import * as ImagePicker from 'expo-image-picker';
import axiosInstance from '../../helpers/axiosInstance';
import { showToast } from '../../redux/toast/actions';

const { width, height } = Dimensions.get("screen");

const Profile = (props: { navigation: any }) => {
    const auth = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigation: any = useNavigation();
    

    useEffect(() => {
        dispatch(loadProfile({ token: auth.token }));
    }, [auth.isAuthenticated, auth.token]);

    const logoutUser = () => {
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
            const base64 = result.base64;
            const data = {
                image: base64
            }
            axiosInstance(null, auth.token).post('/user/update_image_profile/', data)
                .then((res) => {
                    dispatch(loadProfile({ token: auth.token}));
                })
                .catch((err) => dispatch(showToast({ message: err.response.data.message, type: 'error' })));

        }
    };

    const redirectEditProfile = () => {
        console.log("HELLO");
        props?.navigation.navigate("EditProfile");
    }


    return (
        <ScrollView contentContainerStyle={styles.container} >
            <View style={styles.wrapperHeader}>
                <MenuOptions />
            </View>
            <View style={{ display: "flex", alignItems: "center", }}>
                <View style={styles.wrapperInfoSection}>
                    <Avatar
                        size={width * 0.25}
                        source={{ uri: auth.user.imageUrl }}
                        title={auth.user.firstName?.charAt(0) || "U"}
                        containerStyle={{ backgroundColor: Colors.blue }}
                        rounded
                    >
                        <Avatar.Accessory onPress={pickImage} size={width * 0.055} />
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
                        onPress={redirectEditProfile}
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