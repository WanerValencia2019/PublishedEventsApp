import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import InputScrollView from 'react-native-input-scroll-view';
import { Button, Card, Input } from 'react-native-elements';
import MultiSelect from 'react-native-multiple-select';
import { fonts } from '../../constants/Texts';
import Colors from '../../constants/Colors';
import TicketCard from '../../components/TicketCard';

const { width } = Dimensions.get("screen");

const TicketStep = () => {
    return (
        <ScrollView contentContainerStyle={styles.root}>
            <TicketCard price={40000} />
            <TicketCard price={2500} />
            <TicketCard price={10000} />
            <TicketCard price={130533} />
            <Button title="Agregar entrada" type='clear' containerStyle={{marginTop: 10}} titleStyle={{color: Colors.blue}} />
        </ScrollView>
    )
}

const { height } = Dimensions.get("screen");

const styles = StyleSheet.create({
    root: {
        marginTop: height * 0.03,
        paddingBottom: height * 0.14,
    }
})

export default TicketStep;