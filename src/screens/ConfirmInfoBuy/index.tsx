import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Button, Card, Input } from 'react-native-elements';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import InputScrollView from 'react-native-input-scroll-view';
import { formatValue } from '../../utils';
import { headers, paragraphs } from '../../constants/Texts';
import Colors from '../../constants/Colors';
import axiosInstance from '../../helpers/axiosInstance';
import { startLoading, stopLoading } from '../../redux/loading/actions';
import WebView from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

interface confirmInfoBuyFormProps {
    fullName: string,
    email: string,
    phone: string,
    identification: string,
}

const ConfirmInfoBuy = ({ route, }: any) => {
    const { handleSubmit, register, formState: { errors }, control, setValue } = useForm<confirmInfoBuyFormProps>();
    const { user } = useAppSelector(state => state.auth);
    const ticket_id = route.params.ticket_id;
    const title = route.params.title;
    const quantity = route.params.quantity;
    const unit_price = route.params.unit_price;
    const [url, setUrl] = React.useState('');
    const navigation: any = useNavigation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        setValue('fullName', user.firstName ? user.firstName + ' ' + user.lastName : '');
        setValue('email', user.email || '');
        setValue('identification', user.identification || '')
    }, [])

    const onSubmit = (data: confirmInfoBuyFormProps) => {
        const { fullName, email, phone, identification } = data;
        const data_to_send = {
            full_name: fullName,
            email,
            phone,
            identification,
            ticket_type_id: ticket_id,
            ticket_quantity: quantity,
        }

        dispatch(startLoading())
        axiosInstance().post("/payment", data_to_send)
            .then(res => {
                const { data } = res;
                //setUrl(data.next_url);
                navigation.navigate("eventPayWebView", { url: data.next_url });
            })
            .catch(err => console.log(err)
            )
            .finally(() => dispatch(stopLoading()))
    }

    return (
        <View style={styles.root}>
            <InputScrollView>
                <Controller
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "Este campo es requerido"
                        }
                    }}
                    name='fullName'
                    render={({ field }) => (
                        <Input
                            {...field}
                            onChangeText={(text) => setValue("fullName", text)}
                            placeholder='Nombre completo'
                            errorMessage={errors.fullName?.message}
                        />
                    )}
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
                    defaultValue={user.identification}
                />
                <Controller
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "Este campo es requerido"
                        },
                        pattern: {
                            value: /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/g,
                            message: "Correo inválido Ej: ejemplo@mail.com"
                        }
                    }}
                    name='email'
                    render={({ field }) => (
                        <Input
                            {...field}
                            onChangeText={(text) => setValue("email", text)}
                            placeholder='Correo eletrónico'
                            errorMessage={errors.email?.message}
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
                            value: /^[0-9]{10}$/g,
                            message: "Teléfono inválido Ej: 3104393323"
                        }
                    }}
                    name='phone'
                    render={({ field }: any) => (
                        <Input
                            {...field}
                            onChangeText={(text) => setValue("phone", text)}
                            placeholder='Número de teléfono'
                            errorMessage={errors.phone?.message}
                        />
                    )}
                />
                <View>
                    <Text style={{ marginLeft: 10, fontSize: headers.h5 }}>Información de compra</Text>
                    <Card>
                        <Text style={{ fontSize: paragraphs.pLarge, fontWeight: 'bold' }}>{title}</Text>
                        <Text style={{ fontSize: paragraphs.pSmall }}>{quantity} entradas</Text>
                        <Text style={{ fontSize: paragraphs.pMedium, color: Colors.blue }}>{formatValue(unit_price * quantity)}</Text>
                    </Card>
                </View>
                <Button onPress={handleSubmit(onSubmit)} buttonStyle={{ backgroundColor: Colors.blue }} containerStyle={{ marginTop: 20, marginLeft: 15, marginRight: 15 }} title="Confirmar compra" />
            </InputScrollView>
        </View>
    )
}

export default ConfirmInfoBuy

const styles = StyleSheet.create({
    root: {
        marginTop: 24
    }
})