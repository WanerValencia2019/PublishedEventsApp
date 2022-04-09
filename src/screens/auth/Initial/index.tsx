import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import { Button, Divider, Input, SocialIcon, Tile } from 'react-native-elements';
import Logo from "./../../../../assets/images/Logo.svg";
import InputScrollView from 'react-native-input-scroll-view';
import LoginForm from '../../../components/forms/LoginForm';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { login, register } from '../../../redux/auth/actions';
import RegisterForm from '../../../components/forms/RegisterForm';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';


type LoginValues = {
    email: string;
    password: string;
};

type RegisterValues = {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
}

const Auth = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector(state => state.auth);
    const navigation:any = useNavigation();

    const [viewActive, setviewActive] = useState<string>("login");

    const handleLogin = ({ email, password }: LoginValues) => {
        dispatch(login({ email, password }))
    }

    const handleRegister = ({ email, password, confirmPassword, firstName, lastName }: RegisterValues) => {
        dispatch(register({ email, password, firstName, lastName }))
    }

    if(auth.isAuthenticated && auth.isAuthenticated) {
        navigation?.navigate("Drawer", { screen: "initial" })
    }

    return (
        <ScrollView scrollToOverflowEnabled alwaysBounceHorizontal style={styles.root}>
            <View style={styles.containerLogo}>
                <Logo style={styles.imgLogo} />
            </View>
            <View style={styles.wrapperSections}>
                <View style={styles.wrapperTabs}>
                    <TouchableOpacity onPress={() => setviewActive("login")}>
                        <Text style={[{ ...styles.tab, }, viewActive === "login" ? {...styles.tabActive}:{...styles.tabInactive} ]}>Iniciar sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setviewActive("register")}>
                    <Text style={[{ ...styles.tab, }, viewActive === "register" ? {...styles.tabActive}:{...styles.tabInactive} ]} >Registrarse</Text>
                </TouchableOpacity>
            </View>
            <View  style={styles.wrapperForms}>
                {viewActive === "login" ? <LoginForm handleLogin={handleLogin} /> : <RegisterForm handleRegister={handleRegister} />}
            </View>
        </View>
        </ScrollView >
    )
}

export default Auth;