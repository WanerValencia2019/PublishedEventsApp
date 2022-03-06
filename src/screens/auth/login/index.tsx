import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import styles from './styles';
import { Button, Divider, Input, SocialIcon, Tile } from 'react-native-elements';
import Logo from "./../../../../assets/images/Logo.svg";
import InputScrollView from 'react-native-input-scroll-view';
import LoginForm from '../../../components/LoginForm';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { login } from '../../../redux/auth/actions';

type LoginValues = {
    email: string;
    password: string;
};


const Auth = () => {

    const dispatch = useAppDispatch();
    const auth = useAppSelector(state => state.auth);

    console.log(auth);

    const handleLogin = ({email, password}:LoginValues) => {
        dispatch(login({ email, password }))
    }
    
    return (
        <ScrollView style={styles.root}>
            <View style={styles.containerLogo}>
                <Logo style={styles.imgLogo} />
            </View>
            <View style={styles.wrapperSections}>
                <View style={styles.wrapperTabs}>
                    <Text style={{ ...styles.tab, ...styles.tabActive }}>Iniciar sesión</Text>
                    <Text style={{ ...styles.tab, ...styles.tabInactive }} >Registrarse</Text>
                </View>
                <InputScrollView style={styles.wrapperForms}>
                    <View>
                        <Text style={styles.welcomeTitle}>Bienvenido</Text>
                        <Text style={styles.titleSignin}>Inicia sesión con tu cuenta</Text>
                    </View>
                    <View style={styles.containerLoginForm}>
                        <LoginForm handleLogin={handleLogin} />
                        <TouchableOpacity onPress={() => console.log("Forget password")}>
                            <Text style={styles.forgetPassword}>Olvidaste tu contraseña?</Text>
                        </TouchableOpacity>
                        <Text style={styles.textOtherSignins}>Ingresa con</Text><View style={styles.containerSocialIcons}>
                            <SocialIcon raised onPress={() => console.log("Click facebook")} type='facebook' />
                            <SocialIcon raised onPress={() => console.log("Click google")} light type='google' />
                        </View>
                    </View>
                </InputScrollView>
            </View>
        </ScrollView>
    )
}

export default Auth;