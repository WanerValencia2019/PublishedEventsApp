import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';

import styles from './styles';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { startLoading, stopLoading } from '../../redux/loading/actions';
import axiosInstance from '../../helpers/axiosInstance';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Divider } from 'react-native-elements';
import Colors from '../../constants/Colors';

const ListEventAssistants = ({ route }: any) => {
  const [assistants, setAssistants] = React.useState([]);
  const { token } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  console.log(assistants);

  useEffect(() => {
    dispatch(startLoading());
    axiosInstance().get(`/events/${route.params.eventId}/assistants`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }) 
      .then((res) => {
        const { data } = res.data;
        setAssistants(data);
      })
      .catch((err) => console.log(err.response.data))
      .finally(() => dispatch(stopLoading()))
  }, [])



  return (
    <View style={styles.root}>
      {
        assistants.length === 0 ? <Text style={styles.notExist}>Todavía no hay asistentes</Text> :
          <ScrollView>
            {
              assistants.map((assistant: any) => (

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
                    <Text style={{ paddingTop: 10,paddingBottom: 10, ...styles.allText, color: "black" }}>{assistant?.ticket_quantity} Entradas para {assistant?.ticket?.name}</Text>
                    <Divider />
                    <View style={{ paddingTop: 5 }}>
                      <Text style={{ color: Colors.blue,...styles.allText}}>Ticket  {assistant?.security_code}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            }
          </ScrollView>
      }
    </View>
  )
}

export default ListEventAssistants;