import React from 'react';
import { View, Text } from 'react-native';
import { ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';

import styles from './styles';

export default function InviteFriends() {
    return (
        <ImageBackground  style={styles.root} source={require("./../../../assets/images/inviteFriendBackground.png")} >
            <View style={styles.wrapperContent}>
                <Text style={styles.title}>Invita a tus amigos</Text>
                <Text style={styles.textReward}>Obten $5.000 para entradas</Text>
                <Button buttonStyle={styles.button} containerStyle={styles.buttonContainer} title="Invitar" />
            </View>
        </ImageBackground>
    );
}
