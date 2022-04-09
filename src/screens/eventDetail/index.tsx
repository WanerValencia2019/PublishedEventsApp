import {View, Text, Image, Dimensions, ImageBackground, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

import styles from './styles';
import axiosInstance from '../../helpers/axiosInstance';
import {Button, Icon} from 'react-native-elements';
import Colors from '../../constants/Colors';
import {ScrollView} from 'react-native-gesture-handler';
import MapShow from '../../components/MapShow';
import MapView from 'react-native-maps';
import MapMarkerEvent from '../../components/MapMarkerEvent';
import {useNavigation} from "@react-navigation/native";
import MercadoPagoCheckout from '@blackbox-vision/react-native-mercadopago-px';

const {width, height} = Dimensions.get("screen")

const EventDetail = (props:any) => {
    const [event, setEvent] = useState<any>(null);
    const navigation = useNavigation<any>();
    const [paymentResult, setPaymentResult] = useState(null);

    const getPreference = async () => {
        const items =[
            {
                "title": "Mi producto",
                "quantity": 1,
                "unit_price": 1
            }
        ]
        try {
            const response = await fetch(
                `https://api.mercadopago.com/checkout/preferences?access_token=TEST-2893408816089565-032503-6819130cb71003292821d8826980c50d-1095670844`,
                {
                  method: 'POST',
                  body: JSON.stringify({
                    items,
                    payer: {
                      email: "payer@email.com",
                    },
                  }),
                }
              );
              const preference = await response.json();
              const preferenceId = preference.id;
              
              const payment:any = await MercadoPagoCheckout.createPayment({
                publicKey: "TEST-cbcb5d73-d30e-485f-ba71-0b6358dc3eb4",
                preferenceId,
                language: "es-CO"
              });
        
              setPaymentResult(payment);
        } catch (error) {
            console.log('====================================');
            console.log("ERROR");
            console.log(error);
            console.log('====================================');
        }
    }


    useEffect(() => {
        axiosInstance().get("/event/detail/" + props.route.params.eventId + "/")
            .then((res) => setEvent(res.data.data))
            .catch((err) => console.log(err.response))
    }, [])

    console.log('====================================');
    console.log(paymentResult);
    console.log('====================================');

    return (
        <View style={styles.root}>
            <ScrollView>
                <ImageBackground imageStyle={{resizeMode: "stretch"}} style={{width: width, height: height * .4}}
                                 source={{uri: event?.image?.image}}>
                    <View style={styles.overlay}/>
                </ImageBackground>

                <Text style={styles.title}>{event?.title}</Text>
                <View style={styles.wrapperDescription}>
                    <Text style={styles.sectionTitle}>Descripción</Text>
                    <Text style={styles.description}>{event?.description}</Text>
                </View>
                <View style={{paddingLeft: 20, marginTop: 7}}>
                    <Text style={styles.sectionTitle}>Fecha de inicio</Text>
                    <View style={styles.wrapperDates}>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                            <Icon type='material-community' name='calendar-outline' color={Colors.blue}
                                  style={{padding: 5}}/>
                            <View>
                                <Text style={styles.dateText}>{new Date(event?.start_date).toDateString()}</Text>
                                <Text style={styles.timeText}>{new Date(event?.start_date).toLocaleTimeString()}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{paddingLeft: 20, marginTop: 5}}>
                    <Text style={styles.sectionTitle}>Fecha de finalización</Text>
                    <View style={styles.wrapperDates}>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                            <Icon type='material-community' name='calendar-outline' color={Colors.blue}
                                  style={{padding: 5}}/>
                            <View>
                                <Text style={styles.dateText}>{new Date(event?.end_date).toDateString()}</Text>
                                <Text style={styles.timeText}>{new Date(event?.end_date).toLocaleTimeString()}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{paddingLeft: 20, marginTop: 5}}>
                    <Text style={styles.sectionTitle}>Ubicación</Text>
                    <View style={styles.wrapperDates}>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                            <Icon  type='material-community' name='google-maps' color={Colors.blue}
                                  style={{padding: 5}}/>
                            <View>
                                <Text style={styles.dateText}>{event?.address}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                {
                    event &&
                    <MapMarkerEvent latitude={Number(event?.latitude)} longitude={Number(event?.longitude)}
                                    eventTitle={event?.title}/>
                }
            </ScrollView>
            <View style={styles.wrapperBottomView}>
                <TouchableOpacity onPress={async()=> await getPreference()} style={styles.buttonBottomView}>
                    <Text style={styles.textBottomButton}>Reservar entrada</Text>
                    <Icon reverse type="material-community" name="arrow-right"  size={16} color={Colors.darkBlueText}  containerStyle={{marginLeft: 12, marginRight: 5}}   />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EventDetail;