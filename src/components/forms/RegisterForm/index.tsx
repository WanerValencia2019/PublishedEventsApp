import React from 'react'
import { Control, Controller, ControllerProps, RegisterOptions, Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native'
import { Button, Input, SocialIcon } from 'react-native-elements'
import styles from './styles';

import InputScrollView from 'react-native-input-scroll-view';

interface RegisterFormTypes {
    handleLogin: any
}

type LoginValues = {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
};

const RegisterForm: React.FC<RegisterFormTypes> = ({ children, handleLogin }) => {
    const { handleSubmit, register, formState: { errors }, control, setValue } = useForm<LoginValues>({
        defaultValues: {
            email: "",
            password: "",
            name: ""
        }
    });

    const submit = (values: LoginValues) => {
        handleLogin({ ...values });
    }

    return (
        <InputScrollView style={styles.containerRegisterForm}>
            <Input {...register("name", {
                required: {
                    value: true,
                    message: "Este campo es requerido"
                }
            })}
                onChangeText={(text) => setValue("name", text)}
                errorMessage={errors.name?.message}
                inputStyle={styles.input} label="Nombre completo" secureTextEntry labelStyle={styles.inputLabel} />
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
            <Input {...register("confirmPassword", {
                required: {
                    value: true,
                    message: "Este campo es requerido"
                }
            })}
                onChangeText={(text) => setValue("confirmPassword", text)}
                errorMessage={errors.confirmPassword?.message}
                inputStyle={styles.input} containerStyle={styles.password} label="Confirmar contraseña" secureTextEntry labelStyle={styles.inputLabel} />
            <Button onPress={handleSubmit(submit)} type='solid' title="Registrarme" titleStyle={styles.buttonTitleStyle} buttonStyle={styles.buttonSignin} containerStyle={styles.containerButton} raised />

            <Text style={styles.textOtherSignins}>Ingresa con</Text><View style={styles.containerSocialIcons}>
                <SocialIcon raised onPress={() => console.log("Click facebook")} type='facebook' />
                <SocialIcon raised onPress={() => console.log("Click google")} light type='google' />
            </View>

        </InputScrollView>
    )
}

export default RegisterForm;
