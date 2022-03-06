import React from 'react';
import { View, Text, Dimensions, ImageBackground } from 'react-native';
import { Image } from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from '../../constants/Colors';
import { fonts, paragraphs } from '../../constants/Texts';

import styles from './styles';

const { width, height } = Dimensions.get("screen");

interface EventCardTypes {
    date: String,
    title: String,
    address: String,
    imgUrl: String
}
const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "July", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];


const EventCard: React.FC<EventCardTypes> = ({ title, address, date, imgUrl }) => {
    return (
        <View style={styles.root}>
            <ImageBackground borderRadius={12} style={styles.imageBackground} source={imgUrl ? { uri: imgUrl } : require("../../../assets/images/img1.png")}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={styles.wrapperDate}>
                        <Text style={styles.textDay}>{new Date(date).getDay()}</Text>
                        <Text style={styles.textMonth}>{monthNames[new Date(date).getMonth() + 1]}</Text>
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
    );
}

export default EventCard;