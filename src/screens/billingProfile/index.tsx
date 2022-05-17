import { View, Text } from 'react-native'
import React from 'react'

import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import { formatValue } from '../../utils';
import { Avatar, Button, FAB, ListItem } from 'react-native-elements';
import Colors from '../../constants/Colors';

const BillingProfile = () => {
  const list = [
    {
      type: 'Retiro',
      value: 100,
      date: '12/12/2020',
      status: 'Pendiente'
    },
    {
      type: 'Retiro',
      value: 150,
      date: '12/12/2020',
      status: 'Rechazado'
    },
    {
      type: 'Retiro',
      value: 200,
      date: '12/12/2020',
      status: 'Completo'
    }
  ];
  return (
    <ScrollView contentContainerStyle={{paddingBottom:30}}>
      <View style={styles.wrapperMoneyContainer}>
        <View style={styles.wrapper}>
          <View>
            <Text style={styles.moneyAvailableTitle}>Saldo disponible</Text>
            <Text style={styles.moneyAvailable}>{formatValue(1000000)}</Text>
          </View>
          <View>
            <Text style={styles.moneyWithdrawTitle}>Dinero retirado</Text>
            <Text style={styles.moneyWithdraw}>{formatValue(1000000000)}</Text>
          </View>
        </View>
        <FAB containerStyle={{ marginTop: 20 }} title="Solicitar retiro" buttonStyle={{ backgroundColor: Colors.darkBlue }} />
      </View>


      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Historial de retiros</Text>
        <View>
          {
            list.map((l, i) => (
              <ListItem key={i} bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{l.type}</ListItem.Title>
                  <ListItem.Subtitle>motivo del retiro</ListItem.Subtitle>
                  <ListItem.Content>
                    <Text>{formatValue(l.value)}</Text>
                    <Text>{l.status}</Text>
                  </ListItem.Content>
                </ListItem.Content>
              </ListItem>
            ))
          }
        </View>
      </View>
    </ScrollView>
  )
}

export default BillingProfile;