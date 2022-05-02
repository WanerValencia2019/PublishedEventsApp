import { View, Text, ScrollView } from 'react-native'
import React from 'react'

import styles from './styles';
import { Button, Icon, Input, ListItem } from 'react-native-elements';
import Colors from '../../constants/Colors';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Controller, useForm } from 'react-hook-form';
import { updateProfile } from '../../redux/auth/actions';


interface EditProfileTypes {
    firstName: string;
    lastName: string;
    identification: string;
    description: string;
}

const EditProfile = () => {
    const auth = useAppSelector(state => state.auth);
    const [expanded, setExpanded] = React.useState(false);
    const [expanded2, setExpanded2] = React.useState(false);
    const [expanded3, setExpanded3] = React.useState(false);
    const dispatch = useAppDispatch();

    const { handleSubmit, register, formState: { errors }, control, setValue } = useForm<EditProfileTypes>();

    const onSubmit = (data: EditProfileTypes) => {
        let { description, firstName, identification, lastName } = data;
        
        description = description.trim();
        
        dispatch(updateProfile({ description, firstName, identification, lastName }))
    }

    return (
        <ScrollView style={styles.root}>
            <View style={{ display: "flex", flexDirection: "column", justifyContent: "center", }}>
                <View>
                    <ListItem.Accordion
                        content={
                            <>
                                <Icon name="account-details" type='material-community' color={Colors.darkBlueText} iconStyle={{ marginRight: 20 }} />
                                <ListItem.Content>
                                    <ListItem.Title style={{ color: Colors.darkBlue }}>Información general</ListItem.Title>
                                    <ListItem.Subtitle style={{ color: Colors.darkBlueText }}>Descripción, edad, etc</ListItem.Subtitle>
                                </ListItem.Content>
                            </>
                        }
                        isExpanded={expanded3}
                        onPress={() => {
                            setExpanded3(!expanded3);
                        }}
                    >
                        <View style={{ marginLeft: 20 }}>
                            <Controller
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        onChangeText={(text) => setValue("description", text)}
                                        errorMessage={errors.description?.message}
                                        placeholder='Descripción'
                                        numberOfLines={8}
                                        multiline />
                                )}
                                control={control}
                                name="description"
                                rules={{ required: true }}
                                defaultValue={auth.user.description}
                            />

                        </View>
                    </ListItem.Accordion>
                </View>
                <View>
                    <ListItem.Accordion
                        content={
                            <>
                                <Icon name="account-details" type='material-community' color={Colors.darkBlueText} iconStyle={{ marginRight: 20 }} />
                                <ListItem.Content>
                                    <ListItem.Title style={{ color: Colors.darkBlue }}>Información personal</ListItem.Title>
                                    <ListItem.Subtitle style={{ color: Colors.darkBlueText }}>Nombre, apellidos, identificación, etc.</ListItem.Subtitle>
                                </ListItem.Content>
                            </>
                        }
                        isExpanded={expanded}
                        onPress={() => {
                            setExpanded(!expanded);
                        }}
                    >
                        <View style={{ marginLeft: 20 }}>
                            <Controller
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        onChangeText={(text) => setValue("firstName", text)}
                                        errorMessage={errors.firstName?.message}
                                        placeholder='Nombre'
                                    />
                                )}
                                control={control}
                                name="firstName" rules={{ required: true }}
                                defaultValue={auth.user.firstName}
                            />
                            <Controller
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        onChangeText={(text) => setValue("lastName", text)}
                                        errorMessage={errors.lastName?.message}
                                        placeholder='Apellidos'
                                    />
                                )}
                                control={control}
                                name="lastName"
                                rules={{ required: true }}
                                defaultValue={auth.user.lastName}
                            />
                            <Controller
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        onChangeText={(text) => setValue("identification", text)}
                                        errorMessage={errors.identification?.message}
                                        placeholder='Identificación'
                                    />
                                )}
                                control={control}
                                name="identification"
                                rules={{ required: true }}
                                defaultValue={auth.user.identification}
                            />
                        </View>
                    </ListItem.Accordion>
                </View>
                <View>
                    <ListItem.Accordion
                        content={
                            <>
                                <Icon name="map-marker-outline" type='material-community' color={Colors.darkBlueText} iconStyle={{ marginRight: 20 }} />
                                <ListItem.Content>
                                    <ListItem.Title style={{ color: Colors.darkBlue }}>Información de contacto</ListItem.Title>
                                    <ListItem.Subtitle style={{ color: Colors.darkBlueText }}>Correo, teléfono, dirección, etc.</ListItem.Subtitle>
                                </ListItem.Content>
                            </>
                        }
                        isExpanded={expanded2}
                        onPress={() => {
                            setExpanded2(!expanded2);
                        }}
                    >
                        <View style={{ marginLeft: 20 }}>
                            <Input disabled placeholder='Correo' value={auth.user.email} />
                            <Input disabled placeholder='Número de telefono' />
                            <Input disabled placeholder='Dirección' />
                        </View>
                    </ListItem.Accordion>
                </View>
                <View>
                    <Button onPress={handleSubmit(onSubmit)} type='outline' containerStyle={{ marginLeft: 10, marginRight: 10, marginTop: 40 }} buttonStyle={{ borderColor: Colors.blue }} titleStyle={{ color: Colors.darkBlueText }} title="Actualizar perfil" />
                </View>
            </View>
        </ScrollView>
    )
}

export default EditProfile