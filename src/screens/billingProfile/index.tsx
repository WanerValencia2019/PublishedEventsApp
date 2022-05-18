import { View, Text, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'

import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import { formatValue } from '../../utils';
import { Avatar, Button, FAB, ListItem } from 'react-native-elements';
import Colors from '../../constants/Colors';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { startLoading, stopLoading } from '../../redux/loading/actions';
import axiosInstance from '../../helpers/axiosInstance';
import { AxiosError } from 'axios';
import { showToast } from '../../redux/toast/actions';
import { headers } from '../../constants/Texts';

const BillingProfile = () => {
  const [saleProfile, setSaleProfile] = React.useState<any>(null);
  const [notFound, setNotFound] = React.useState(false);

  const dispatch = useAppDispatch();
  const { token } = useAppSelector(state => state.auth);
  const [refreshing, setRefreshing] = useState(false);


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

  const getSaleProfile = () => {
    dispatch(startLoading())
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
    axiosInstance()
      .get("/sale_profile", { headers })
      .then(res => {
        const { data } = res.data;
        console.log(res.data);

        setSaleProfile(data);
      })
      .catch((err: AxiosError) => {
        setNotFound(true);
        if (err.response?.status === 404) {
          dispatch(showToast({ message: "Debes crear tu primer evento", type: "info" }))
        } else {
          dispatch(showToast({ message: "Ocurrió un error", type: "error" }))
        }
      })
      .finally(() => dispatch(stopLoading()))
  }

  useEffect(() => {
    getSaleProfile()
    return () => {
      dispatch(stopLoading())
    };
  }, [])


  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 30 }}
      refreshControl={
        <RefreshControl
          onRefresh={getSaleProfile}
          refreshing={refreshing}
        />
      }
    >
      {
        !notFound ?
      <>
      <View style={styles.wrapperMoneyContainer}>
        <View style={styles.wrapper}>
          <View>
            <Text style={styles.moneyAvailableTitle}>Saldo disponible</Text>
            <Text style={styles.moneyAvailable}>{formatValue(saleProfile?.amount_available || 0)}</Text>
          </View>
          <View>
            <Text style={styles.moneyWithdrawTitle}>Dinero retirado</Text>
            <Text style={styles.moneyWithdraw}>{formatValue(saleProfile?.amount_retired || 0)}</Text>
          </View>
        </View>
        <FAB containerStyle={{ marginTop: 20 }} title="Solicitar retiro" buttonStyle={{ backgroundColor: Colors.darkBlue }} />
      </View>
      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Historial de retiros</Text>
        <View>
          {
            saleProfile?.withdraws?.map((withdraw: any, i: number) => (
              <ListItem key={i} bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>Retiro</ListItem.Title>
                  <ListItem.Content>
                    <Text>{formatValue(withdraw?.amount_withdrawn)}</Text>
                    {
                      withdraw?.status === 'CREATED' && <Text style={styles.statusPending}>Pendiente</Text>
                    }
                    {
                      withdraw?.status === 'DECLINED' && <Text style={styles.statusRejected}>Rechazado</Text>
                    }
                    {
                      withdraw?.status === 'ACCEPTED' && <Text style={styles.statusAccepted}>Aceptado</Text>
                    }
                  </ListItem.Content>
                </ListItem.Content>
              </ListItem>
            ))
          }
        </View>
      </View>
      </>:<Text style={{fontSize: headers.h3}}>Debes crear tu primer evento, para tener un perfil de pagos</Text>
      
      }
    </ScrollView>
  )
}

export default BillingProfile;