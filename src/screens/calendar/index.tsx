import { View, Text, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Calendar } from 'react-native-calendars';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import { Button } from 'react-native-elements';
import { headers } from '../../constants/Texts';
import { listMyAssists } from '../../redux/events/actions';
import dayjs from 'dayjs';
import Colors from '../../constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';

const MyCalendar = () => {
  const auth = useAppSelector(state => state.auth);
  const { myAssists } = useAppSelector(state => state.events);
  const [dots, setDots] = React.useState({});
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getMyAssistance();
  }, [auth.token, auth.isAuthenticated])

  const getMyAssistance = () => {
    dispatch(listMyAssists({ identification: auth.user.identification }));
  }

  const redirectToLogin = () => {
    navigation.navigate('auth');
  }

  useEffect(() => {
    if (myAssists) {
      const assistDots: any = {};
      myAssists.forEach((assist: any) => {
        const date = dayjs(assist?.ticket?.event?.start_date).format('YYYY-MM-DD');
        assistDots[date] = {
          marked: true,
          selected: true,
          selectedColor: Colors.blue
        }
      })
      setDots(assistDots);
    }
  }, [myAssists])


  if (!auth.isAuthenticated && !auth.token) {
    return (
      <View style={styles.notLogin}

      >
        <Text style={{ fontSize: headers.h5, marginBottom: 10 }}>No estás autenticado</Text>
        <Button title="Iniciar sesión" onPress={redirectToLogin} />
      </View>
    )
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          onRefresh={getMyAssistance}
          refreshing={refreshing}
        />
      }
    >
      <Calendar
        displayLoadingIndicator
        markedDates={dots}
      />
    </ScrollView>
  )
}

export default MyCalendar;