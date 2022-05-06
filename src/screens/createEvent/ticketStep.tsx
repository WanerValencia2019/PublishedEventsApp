import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native'
import React, { useState } from 'react'
import InputScrollView from 'react-native-input-scroll-view';
import { Button, Card, FAB, Icon, Input } from 'react-native-elements';
import MultiSelect from 'react-native-multiple-select';
import { fonts } from '../../constants/Texts';
import Colors from '../../constants/Colors';
import TicketCard from '../../components/TicketCard';
import CreateTicketType from '../../components/CreateTicketType';
import { useAppSelector } from '../../hooks/redux';
import { generateString } from '../../utils';

const { width } = Dimensions.get("screen");


const TicketStep = ({ handleBack, handleNext }: any) => {
    const [visible, setVisible] = useState(false);

    const { newEvent: { tickets, info } } = useAppSelector(state => state.events)

    const showModal = () =>{
        setVisible((prev)=>!prev);
    }
    console.log('====================================');
    console.log(info);
    console.log('====================================');
    
    return (
        <View style={styles.root}>
            <ScrollView>
            {
                tickets && tickets.map((ticket, index: number) => (
                    <TicketCard key={generateString()} description={ticket.description} name={ticket.name} isFree={Number(ticket.price) === 0} price={ticket.price}  />
                ))
            }
            </ScrollView>
            <Button onPress={showModal} title="Agregar entrada" type='clear' containerStyle={{ marginTop: 5, marginBottom: 60 }} titleStyle={{ color: Colors.blue }} />
            <View  style={{ position: "absolute", left: 0, right:0, bottom: height * 0.31}}>
                <View style={{ position: "absolute", left: 0, bottom: 0}}>
                    <FAB onPress={handleBack} disabled={false} iconPosition='left' icon={<Icon type='material-community' name='arrow-left' color={Colors.light.background} />} title="Anterior" color={Colors.orange} />
                </View>
                <View style={{ position: "absolute", right: 0, bottom: 0 }}>
                    <FAB onPress={handleNext} disabled={false} title="Siguiente" color={Colors.blue} iconPosition='right' icon={<Icon type='material-community' name='arrow-right' color={Colors.light.background} />} />
                </View>
            </View> 
            <CreateTicketType setVisible={setVisible} visible={visible} />
        </View>
    )
}

const { height } = Dimensions.get("screen");

const styles = StyleSheet.create({
    root: {
        marginTop: height * 0.03,
        paddingBottom: height * 0.31,
        height
    }
})

export default TicketStep;