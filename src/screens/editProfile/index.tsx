import { View, Text } from 'react-native'
import React from 'react'

import styles from './styles';
import { Button, Icon, Input, ListItem } from 'react-native-elements';
import Colors from '../../constants/Colors';
import { useAppSelector } from '../../hooks/redux';

const EditProfile = () => {
    const auth = useAppSelector(state => state.auth);
    const [expanded, setExpanded] = React.useState(false);
    const [expanded2, setExpanded2] = React.useState(false);
    const [expanded3, setExpanded3] = React.useState(false);

    const list = [
        {
            title: 'Información personal',
            description: "Nombre, apellidos, identificación, etc.",
            icon: 'av-timer'
        },
        {
            title: 'Información de contacto',
            description: "Correo, teléfono, dirección, etc.",
            icon: 'flight-takeoff',
        },
    ]
    return (
        <View style={styles.root}>
            <View style={{ display: "flex", flexDirection: "column", justifyContent: "center", }}>
                <View>
                    <ListItem.Accordion
                        content={
                            <>
                                <Icon name="account-details" type='material-community' color={Colors.darkBlueText} iconStyle={{ marginRight: 20 }} />
                                <ListItem.Content>
                                    <ListItem.Title style={{color: Colors.darkBlue}}>Información general</ListItem.Title>
                                    <ListItem.Subtitle style={{color: Colors.darkBlueText}}>Descripción, edad, etc</ListItem.Subtitle>
                                </ListItem.Content>
                            </>
                        }
                        isExpanded={expanded3}
                        onPress={() => {
                            setExpanded3(!expanded3);
                        }}
                    >
                        <View style={{ marginLeft: 20 }}>
                            <Input placeholder='Descripción' numberOfLines={10} value={auth.user.description}  multiline />
                        </View>
                    </ListItem.Accordion>
                </View>
                <View>
                    <ListItem.Accordion
                        content={
                            <>
                                <Icon name="account-details" type='material-community' color={Colors.darkBlueText} iconStyle={{ marginRight: 20 }} />
                                <ListItem.Content>
                                    <ListItem.Title style={{color: Colors.darkBlue}}>Información personal</ListItem.Title>
                                    <ListItem.Subtitle style={{color: Colors.darkBlueText}}>Nombre, apellidos, identificación, etc.</ListItem.Subtitle>
                                </ListItem.Content>
                            </>
                        }
                        isExpanded={expanded}
                        onPress={() => {
                            setExpanded(!expanded);
                        }}
                    >
                        <View style={{ marginLeft: 20 }}>
                            <Input placeholder='Nombre' value={auth.user.firstName} />
                            <Input placeholder='Apellidos' value={auth.user.lastName} />
                            <Input placeholder='Identificación' value={auth.user.identification} />
                        </View>
                    </ListItem.Accordion>
                </View>
                <View>
                    <ListItem.Accordion
                        content={
                            <>
                                <Icon name="map-marker-outline" type='material-community' color={Colors.darkBlueText} iconStyle={{ marginRight: 20 }} />
                                <ListItem.Content>
                                    <ListItem.Title style={{color: Colors.darkBlue}}>Información de contacto</ListItem.Title>
                                    <ListItem.Subtitle style={{color: Colors.darkBlueText}}>Correo, teléfono, dirección, etc.</ListItem.Subtitle>
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
                            <Input placeholder='Número de telefono' />
                            <Input disabled placeholder='Dirección' />
                        </View>
                    </ListItem.Accordion>
                </View>
                <View>
                    <Button type='outline' containerStyle={{ marginLeft: 10, marginRight: 10, marginTop: 40 }} buttonStyle={{ borderColor: Colors.blue }} titleStyle={{ color: Colors.darkBlueText }} title="Actualizar perfil" />
                </View>
            </View>
        </View>
    )
}

export default EditProfile