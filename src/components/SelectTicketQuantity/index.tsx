import { Dimensions, Modal, StyleSheet, Text, View } from 'react-native'
import React, { Dispatch } from 'react'
import { Controller, useForm } from 'react-hook-form';
import NumericInput from 'react-native-numeric-input'
import { Button, Overlay } from 'react-native-elements';
import Colors from '../../constants/Colors';
import { fonts, headers } from '../../constants/Texts';
import { useAppDispatch } from '../../hooks/redux';
import { showToast } from '../../redux/toast/actions';
import { useNavigation } from '@react-navigation/native';

interface SelectTicketQuantityProps {
    availableTickets: number,
    title: string,
    ticket_id: string,
    visible: boolean,
    unit_price: number,
    setVisible: Dispatch<boolean>,
}
interface SelectTicketQuantityForm {
    quantity: number
}

const { width } = Dimensions.get('screen');

const SelectTicketQuantity: React.FC<SelectTicketQuantityProps> = ({ availableTickets, setVisible,title, ticket_id, unit_price , visible }) => {
    const { handleSubmit, register, formState: { errors }, control, setValue } = useForm<SelectTicketQuantityForm>();
    const dispatch = useAppDispatch();
    const navigation:any = useNavigation();

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const onSubmit = (data: SelectTicketQuantityForm) => {
        const { quantity } = data;
        if(typeof quantity  === "undefined" || quantity == 0) {
            dispatch(showToast({message: "Debes seleccionar la cantidad", type: "error" }));
            return;
        }
        navigation.navigate('eventConfirmInfoBuy', { quantity, title, ticket_id, unit_price });
        toggleOverlay();
    }

    return (
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            <Text style={styles.title}>{title}</Text>
            <Controller
                control={control}
                {...register('quantity')}
                name="quantity"
                defaultValue={0}
                render={({ field }) => (
                    <NumericInput
                        {...field}
                        step={1}
                        valueType='integer'
                        rounded
                        maxValue={availableTickets}
                        minValue={availableTickets === 0 ? 0 : 1}
                        textColor={Colors.blue}
                        iconStyle={{ color: 'white' }}
                        rightButtonBackgroundColor={Colors.darkBlue}
                        leftButtonBackgroundColor={Colors.darkGray}
                        totalWidth={240} 
                        totalHeight={40} 
                        />
                )}

            />
            <View style={{marginTop: 20,display: "flex", flexDirection:"row", width: "100%"}}>
                <Button onPress={toggleOverlay} type='outline' title="Cancelar" containerStyle={{width: width*0.35}} />
                <Button disabled={availableTickets === 0} onPress={handleSubmit(onSubmit)} buttonStyle={{backgroundColor: Colors.darkBlueText}} containerStyle={{width: width*0.35, marginLeft: 20}} title="Comprar" />
            </View>
        </Overlay>
    );
}

export default SelectTicketQuantity;

const styles = StyleSheet.create({
    title: {
        fontFamily: fonts.Roboto_500Medium,
        fontSize: headers.h5,
        marginBottom: 10,
    }
})