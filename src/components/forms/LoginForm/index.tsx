import React from 'react'
import { Control, Controller, ControllerProps, RegisterOptions, Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View, TextInput } from 'react-native'
import { Button, Input, SocialIcon } from 'react-native-elements'

import styles from './styles';

import InputScrollView from 'react-native-input-scroll-view';

interface LoginFormTypes {
    handleLogin: any
}

type LoginValues = {
    email: string;
    password: string;
};

const LoginForm: React.FC<LoginFormTypes> = ({ children, handleLogin }) => {
    const { handleSubmit, register, formState: { errors }, control, setValue } = useForm<LoginValues>({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const submit = (values: LoginValues) => {
        handleLogin({ ...values });
    }

    return (
        <InputScrollView style={styles.containerLoginForm}>
            <View>
                <Text style={styles.welcomeTitle}>Bienvenido</Text>
                <Text style={styles.titleSignin}>Inicia sesión con tu cuenta</Text>
            </View>
            <Input {...register("email", {
                required: {
                    value: true,
                    message: "Este campo es requerido"
                },
                pattern: {
                    value: /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/g,
                    message: "Correo inválido Ej: ejemplo@mail.com"
                }
            })}
                errorMessage={errors.email?.message}
                onChangeText={(text) => setValue("email", text)} inputStyle={styles.input} label="Correo electrónico" labelStyle={styles.inputLabel} />
            <Input {...register("password", {
                required: {
                    value: true,
                    message: "Este campo es requerido"
                }
            })}
                onChangeText={(text) => setValue("password", text)}
                errorMessage={errors.password?.message}
                inputStyle={styles.input} containerStyle={styles.password} label="Contraseña" secureTextEntry labelStyle={styles.inputLabel} />
            <Button onPress={handleSubmit(submit)} type='solid' title="Iniciar sesión" titleStyle={styles.buttonTitleStyle} buttonStyle={styles.buttonSignin} containerStyle={styles.containerButton} raised />
            <TouchableOpacity onPress={() => console.log("Forget password")}>
                <Text style={styles.forgetPassword}>Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
            <Text style={styles.textOtherSignins}>Ingresa con</Text><View style={styles.containerSocialIcons}>
                <SocialIcon raised onPress={() => console.log("Click facebook")} type='facebook' />
                <SocialIcon raised onPress={() => console.log("Click google")} light type='google' />
            </View>
        </InputScrollView>
    )
}

export default LoginForm;
