import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

import Img from "./../../../assets/images/img1.png";
import { Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import LoadingGIF from "./../../../assets/images/loadImage.gif";

import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

interface SimpleCardProps {
    imageUrl: string,
    title: string,
    date: string,
    id: string,
    onPress?: any,
}

const SimpleCard: React.FC<SimpleCardProps> = ({ imageUrl, title, date, id, onPress }) => {
    const navigation = useNavigation<any>()
    return (
        <TouchableOpacity onPress={() => onPress ? onPress(): navigation?.navigate("EventDetailStack", { screen: "eventDetail", params: { eventId: id }, })}>
            <View style={styles.root}>
                <Image loadingIndicatorSource={{uri: "https://www.citypng.com/public/uploads/preview/loading-load-icon-transparent-png-11639609114lctjenyas8.png"}} style={{ width: 79, height: 92, borderRadius: 8 }} source={imageUrl ? { uri: imageUrl } : Img} />
                <View style={styles.content}>
                    <Text style={styles.date}>{dayjs(date).format("D MMMM [-] dddd [-] h:mm A")}</Text>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default SimpleCard;