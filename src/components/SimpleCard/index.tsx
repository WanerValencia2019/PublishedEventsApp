import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

import Img from "./../../../assets/images/img1.png";
import { Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

interface SimpleCardProps {
    imageUrl: string,
    title: string,
    date: string,
    id: string,
}

const SimpleCard: React.FC<SimpleCardProps> = ({ imageUrl, title, date, id }) => {
    const navigation = useNavigation<any>()
    return (
        <TouchableOpacity onPress={() => navigation?.navigate("EventDetailStack", { screen: "eventDetail", params: { eventId: id }, })}>
            <View style={styles.root}>
                <Image style={{ width: 79, height: 92, borderRadius: 8 }} source={imageUrl ? { uri: imageUrl } : Img} />
                <View style={styles.content}>
                    <Text style={styles.date}>{dayjs(date).format("D MMMM [-] dddd [-] h:mm A")}</Text>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default SimpleCard;