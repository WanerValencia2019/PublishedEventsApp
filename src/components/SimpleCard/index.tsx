import React from 'react'
import { View, Text } from 'react-native';

import styles from './styles';

import Img from "./../../../assets/images/img1.png";
import { Image } from 'react-native-elements';

interface SimpleCardProps {
    imageUrl: string,
    title: string,
    date: string
}

const SimpleCard: React.FC<SimpleCardProps> = ({ imageUrl, title, date }) => {
    return (
        <View style={styles.root}>
            <Image style={{ width: 79, height: 92, borderRadius: 8 }} source={imageUrl ? {uri: imageUrl}: Img} />
            <View style={styles.content}>
                <Text style={styles.date}>{new Date(date).toLocaleString()}</Text>
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
    )
}

export default SimpleCard;