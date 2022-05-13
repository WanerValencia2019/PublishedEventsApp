import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
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
import { startLoading, stopLoading } from '../../redux/loading/actions';
import { getMyEvents } from '../../redux/events/actions';
import EventCard from '../../components/EventCard';

const { width, height } = Dimensions.get("screen");

const Profile = (props: { navigation: any }) => {
    const auth = useAppSelector(state => state.auth);
    const { myEvents } = useAppSelector(state => state.events);
    const dispatch = useAppDispatch();
    const navigation: any = useNavigation();


    useEffect(() => {
        dispatch(loadProfile({ token: auth.token }));
        dispatch(getMyEvents());
    }, [auth.isAuthenticated, auth.token, auth.id_log]);

    const logoutUser = () => {
        dispatch(logout());
    }

    console.log(myEvents);


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
            dispatch(startLoading())
            const base64 = result.base64;
            const data = {
                image: base64
            }
            axiosInstance(null, auth.token).post('/user/update_image_profile/', data)
                .then((res) => {
                    dispatch(loadProfile({ token: auth.token }));
                })
                .catch((err) => dispatch(showToast({ message: err.response.data.message, type: 'error' })))
                .finally(() => dispatch(stopLoading()));
        }
    };

    const redirectEditProfile = () => {
        props?.navigation.navigate("EditProfile");
    }

    const clickCard = (event:any) => {
        navigation.navigate("UserDetailEvent", { eventId: event.id })
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
                        source={auth.user.imageUrl ? { uri: auth.user.imageUrl } : null}
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
                {/*} <Button containerStyle={{ paddingTop: height*0.1 }} onPress={logoutUser} title="Cerrar sesión" buttonStyle={{backgroundColor: Colors.darkBlueText}} /> {*/}
                <View style={{ alignSelf: "flex-start", marginTop: height * 0.01 }}>

                        <View style={styles.wrapperUpcomingEventHeader}>
                            <Text style={styles.createdEventsTitle}>Mis eventos</Text>
                            <TouchableOpacity style={{ display: "flex", flexDirection: "row", alignItems: "center", marginRight: 15 }}>
                                <Text onPress={() => navigation?.navigate("ListUserEvents")} style={styles.textSeeAll}>Ver todos</Text>
                                <Icon type='material-community' color={Colors.darkGray} size={15} name='arrow-right' />
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {
                               myEvents.length > 0 ? myEvents?.slice(0, 10).map((event) => (
                                    <EventCard onPress={() => clickCard(event)} key={event?.id} id={event?.id} navigation={navigation} title={event?.title} address={event?.address} date={event?.start_date} imgUrl={event?.image?.image} />
                                )): <Text style={styles.noEvents}>No tienes eventos creados</Text>
                            }
                        </ScrollView>
    
                </View>
            </View>
        </ScrollView>
    )
}

export default Profile;