import { View, Text, Image, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';

import styles from './styles';
import axiosInstance from '../../helpers/axiosInstance';
import { Button, Icon } from 'react-native-elements';
import Colors from '../../constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import MapMarkerEvent from '../../components/MapMarkerEvent';
import { useNavigation } from "@react-navigation/native";


import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { useAppDispatch } from '../../hooks/redux';
import { startLoading, stopLoading } from '../../redux/loading/actions';

const { width, height } = Dimensions.get("screen")

const EventDetail = (props: any) => {
    const [event, setEvent] = useState<any>(null);
    const navigation = useNavigation<any>();
    const [paymentResult, setPaymentResult] = useState(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchData = async () => {
            dispatch(startLoading())
            axiosInstance().get("/event/detail/" + props.route.params.eventId + "/")
                .then((res) => setEvent(res.data.data))
                .catch((err) => console.log(err.response))
                .finally(() => dispatch(stopLoading()))
        }
        fetchData();
    }, [])

    console.log('====================================');
    console.log(paymentResult);
    console.log('====================================');

    return (
        <View style={styles.root}>
            <ScrollView>
                <ImageBackground imageStyle={{ resizeMode: "stretch" }} style={{ width: width, height: height * .4 }}
                    source={{ uri: event?.image?.image }}>
                    <View style={styles.overlay} />
                </ImageBackground>

                <Text style={styles.title}>{event?.title}</Text>
                <View style={styles.wrapperDescription}>
                    <Text style={styles.sectionTitle}>Descripción</Text>
                    <Text style={styles.description}>{event?.description}</Text>
                </View>
                <View style={{ paddingLeft: 20, marginTop: 7 }}>
                    <Text style={styles.sectionTitle}>Fecha de inicio</Text>
                    <View style={styles.wrapperDates}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <Icon type='material-community' name='calendar-outline' color={Colors.blue}
                                style={{ padding: 5 }} />
                            <View>
                                <Text style={styles.dateText}>{dayjs(event?.start_date).format("DD [de] MMMM, YYYY")}</Text>
                                <Text style={styles.timeText}>{dayjs(event?.start_date).format("h:mm A")}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ paddingLeft: 20, marginTop: 5 }}>
                    <Text style={styles.sectionTitle}>Fecha de finalización</Text>
                    <View style={styles.wrapperDates}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <Icon type='material-community' name='calendar-outline' color={Colors.blue}
                                style={{ padding: 5 }} />
                            <View>
                            <Text style={styles.dateText}>{dayjs(event?.end_date).format("DD [de] MMMM, YYYY")}</Text>
                                <Text style={styles.timeText}>{dayjs(event?.end_date).format("h:mm A")}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ paddingLeft: 20, marginTop: 5 }}>
                    <Text style={styles.sectionTitle}>Ubicación</Text>
                    <View style={styles.wrapperDates}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <Icon type='material-community' name='google-maps' color={Colors.blue}
                                style={{ padding: 5 }} />
                            <View>
                                <Text style={styles.dateText}>{event?.address}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                {
                    event &&
                    <MapMarkerEvent latitude={Number(event?.latitude)} longitude={Number(event?.longitude)}
                        eventTitle={event?.title} />
                }
            </ScrollView>
            <View style={styles.wrapperBottomView}>
                <TouchableOpacity style={styles.buttonBottomView}>
                    <Text style={styles.textBottomButton}>Reservar entrada</Text>
                    <Icon reverse type="material-community" name="arrow-right" size={16} color={Colors.darkBlueText} containerStyle={{ marginLeft: 12, marginRight: 5 }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EventDetail;