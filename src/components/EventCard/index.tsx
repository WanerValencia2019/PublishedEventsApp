import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, ImageBackground, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { Image } from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from '../../constants/Colors';
import { fonts, paragraphs } from '../../constants/Texts';

import Img from "./../../../assets/images/img1.png";

import LoadingGIF from "./../../../assets/images/loadImage.gif";

import styles from './styles';

const { width, height } = Dimensions.get("screen");

import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

interface EventCardTypes {
    id: string,
    date: string,
    title: string,
    address: String,
    imgUrl: string,
    navigation: any
}
const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "July", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];


const EventCard: React.FC<EventCardTypes> = ({ id, title, address, date, imgUrl, navigation}) => {

    return (
        <TouchableOpacity onPress={() => navigation?.navigate("EventDetailStack", { screen: "eventDetail", params: { eventId: id }, })}>
            <View style={styles.root} >
                <ImageBackground loadingIndicatorSource={LoadingGIF} borderRadius={12} style={styles.imageBackground} source={imgUrl ? { uri: imgUrl } : Img}>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={styles.wrapperDate}>
                            <Text style={styles.textDay}>{dayjs(date).format('D')}</Text>
                            <Text style={styles.textMonth}>{dayjs(date).format('MMMM')}</Text>
                        </View>
                        <View style={{ width: 30, height: 30, backgroundColor: Colors.light.background, borderRadius: 6, display: "flex", justifyContent: "center" }}>
                            <Icon color="#EB5757" type='material-community' name='bookmark' />
                        </View>
                    </View>
                </ImageBackground>
                <View style={{ marginLeft: 10, }}>
                    <Text numberOfLines={1} style={styles.textTitle}>{title}</Text>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                        <Icon type='material-community' name='map-marker' size={paragraphs.pMedium} color={Colors.darkGray} />
                        <Text numberOfLines={1} style={styles.textAddress}>{address}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default EventCard;