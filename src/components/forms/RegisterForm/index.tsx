import React from 'react'
import { Control, Controller, ControllerProps, RegisterOptions, Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native'
import { Button, Input, SocialIcon } from 'react-native-elements'
import styles from './styles';

import InputScrollView from 'react-native-input-scroll-view';

interface RegisterFormTypes {
    handleRegister: any
}

type RegisterValues = {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
}

const RegisterForm: React.FC<RegisterFormTypes> = ({ children, handleRegister }) => {
    const { handleSubmit, register, formState: { errors }, control, setValue } = useForm<RegisterValues>({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
        }
    });

    const submit = (values: RegisterValues) => {
        handleRegister({ ...values });
    }

    return (
        <InputScrollView style={styles.containerRegisterForm}>
            <Input {...register("firstName", {
                required: {
                    value: true,
                    message: "Este campo es requerido"
                }
            })}
                onChangeText={(text) => setValue("firstName", text)}
                errorMessage={errors.firstName?.message}
                inputStyle={styles.input} label="Nombre"  labelStyle={styles.inputLabel} />
             <Input {...register("lastName", {
                required: {
                    value: true,
                    message: "Este campo es requerido"
                }
            })}
                onChangeText={(text) => setValue("lastName", text)}
                errorMessage={errors.lastName?.message}
                inputStyle={styles.input} label="Apellidos"  labelStyle={styles.inputLabel} />
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
