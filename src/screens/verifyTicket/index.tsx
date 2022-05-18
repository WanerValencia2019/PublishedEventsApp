import { View, Text, TouchableOpacity } from 'react-native'
import React, { Dispatch } from 'react'

import styles from './styles';
import { Button, Divider, Input, Overlay } from 'react-native-elements';
import { useAppDispatch } from '../../hooks/redux';
import { Controller, useForm } from 'react-hook-form';
import { startLoading, stopLoading } from '../../redux/loading/actions';
import axiosInstance from '../../helpers/axiosInstance';
import { showToast } from '../../redux/toast/actions';
import Colors from '../../constants/Colors';

interface VerifyTicketProps {
  visible: boolean,
  setVisible: Dispatch<boolean>,
}

interface VerifyTicketForm {
  ticket: string,
}



const VerifyTicket: React.FC<VerifyTicketProps> = ({ setVisible, visible }) => {
  const dispatch = useAppDispatch();
  const { handleSubmit, register, formState: { errors }, control, setValue, reset } = useForm<VerifyTicketForm>();
  const [assistant, setAssistant] = React.useState<any>({});

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const onSubmit = (data: VerifyTicketForm) => {
    const { ticket } = data;

    const upper_ticket = ticket.toUpperCase();

    dispatch(startLoading());
    axiosInstance()
      .get(`/events/assistant?code=${ticket}`)
      .then(({ data }) => {
        const { data: result } = data;
        setAssistant(result);
      })
      .catch(err => {
        console.log(err.response.data);
        dispatch(showToast({ message: "Ticket inválido", type: "error" }));
      })
      .finally(() => dispatch(stopLoading()))
  }

  console.log('====================================');
  console.log(assistant);
  console.log('====================================');

  return (
    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
      <View>
        <Text style={styles.title}>Verificar asistencia</Text>
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: "Este campo es requerido"
            },
            minLength: {
              value: 8,
              message: "El código debe tener 6 caracteres"
            }
          }}
          name='ticket'
          render={({ field }) => (
            <Input {...field}
              label="Código(Últimos 8 caracteres)"
              onChangeText={(text) => {
                setValue("ticket", text)
                setAssistant({});
            }}
              errorMessage={errors.ticket?.message}
              containerStyle={styles.inputContainer}
            />
          )}
        />
        <Button onPress={handleSubmit(onSubmit)} containerStyle={styles.buttonContainer} type='outline' title="Consultar" />
      </View>
      <Divider style={{ paddingTop: 10 }} />
      <View>
        {
          assistant?.id && (
            <TouchableOpacity>
              <View style={styles.userCard}>
                <Text style={styles.fullName}>{assistant?.full_name}</Text>
                <Text style={{ paddingBottom: 10, ...styles.allText }}>{assistant?.identification}</Text>
                <Divider />
                <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                  <Text style={styles.allText}>{assistant?.email}</Text>
                  <Text style={styles.allText}>+57 {assistant?.phone}</Text>
                </View>
                <Divider />
                <Text style={{ paddingTop: 10, paddingBottom: 10, ...styles.allText, color: "black" }}>{assistant?.ticket_quantity} Entradas para {assistant?.ticket?.name}</Text>
                <Divider />
                <View style={{ paddingTop: 5 }}>
                  <Text style={{ color: Colors.blue, ...styles.allText }}>Ticket  {assistant?.security_code}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        }
      </View>
    </Overlay>
  )
}

export default VerifyTicket;