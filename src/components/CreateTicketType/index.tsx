import { Dimensions, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, useState } from 'react'
import { Button, Input, Overlay } from 'react-native-elements';
import { fonts, headers } from '../../constants/Texts';
import InputScrollView from 'react-native-input-scroll-view';
import Colors from '../../constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/redux';
import { newEventAddTicket } from '../../redux/events/actions';


interface CreateTicketTypeProps {
    visible: boolean,
    setVisible: Dispatch<boolean>,
}

interface TicketStepTypesForm {
    name: string,
    description: string,
    quantity: any,
    price: any
}


const CreateTicketType: React.FC<CreateTicketTypeProps> = ({ visible, setVisible }) => {
    const dispatch = useAppDispatch();
    const { handleSubmit, register, formState: { errors }, control, setValue, reset } = useForm<TicketStepTypesForm>();
    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const onSubmit = (data: TicketStepTypesForm) => {
        const  { description, name, price, quantity } = data;
        dispatch(newEventAddTicket({
            description, 
            name, 
            price,
            quantity
        }))
        toggleOverlay();
        reset();
    }

    return (
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            <View style={styles.root}>
                <Text style={styles.title}>Nueva entrada</Text>
                <KeyboardAvoidingView behavior='height'>
                    <Controller
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: "Este campo es requerido"
                            }
                        }}
                        name='name'
                        render={({ field }) => (
                            <Input {...field}
                                label="Nombre"
                                onChangeText={(text) => setValue("name", text)}
                                errorMessage={errors.name?.message}
                            />
                        )}

                    />
                    <Controller
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: "Este campo es requerido"
                            },
                        }}
                        name='description'
                        render={({ field }) => (
                            <Input {...field}
                                label="Descripción corta" maxLength={200}
                                multiline
                                numberOfLines={3}
                                onChangeText={(text) => setValue("description", text)}
                                errorMessage={errors.description?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: "Este campo es requerido"
                            },
                            pattern: {
                                value: /^[0-9]+$/,
                                message: "Este campo solo acepta numeros"
                            }
                        }}
                        name='quantity'
                        render={({ field }) => (
                            <Input {...field}
                                label="Entradas disponibles"
                                onChangeText={(text) => setValue("quantity", text)}
                                errorMessage={errors.quantity?.message}
                            />
                        )}

                    />
                    <Controller
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: "Este campo es requerido"
                            },
                            pattern: {
                                value: /^[0-9]+$/,
                                message: "Este campo solo acepta numeros"
                            }
                        }}
                        name='price'
                        render={({ field }) => (
                            <Input {...field}
                                label="Precio de entrada"
                                onChangeText={(text) => setValue("price", text)}
                                errorMessage={errors.price?.message}
                            />
                        )}

                    />
                </KeyboardAvoidingView>
                <Button onPress={handleSubmit(onSubmit)} title="Añadir" buttonStyle={{ backgroundColor: Colors.darkBlueText }} />
            </View>
        </Overlay>
    )
}

export default CreateTicketType;

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
    root: {
        padding: 10,
        width: width * 0.9,
    },
    title: {
        fontFamily: fonts.Roboto_400Regular,
        fontWeight: "400",
        textAlign: "center",
        fontSize: headers.h5,
        marginBottom: 10
    }
})