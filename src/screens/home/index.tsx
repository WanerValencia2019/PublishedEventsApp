import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { Icon } from 'react-native-elements';
import EventCard from '../../components/EventCard';
import HeaderHome from '../../components/HeaderHome';
import InviteFriends from '../../components/InviteFriends';
import Colors from '../../constants/Colors';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getAllNextEvents, getNearEvents } from '../../redux/events/actions';
import { calcularDelta } from '../../utils';
import * as Location from 'expo-location';

import styles from './styles';

export default function Home({ navigation }: any) {
  const dispatch = useAppDispatch();
  const { nextEvents, nearEvents, id_log } = useAppSelector((state) => state.events);
  const [refreshing, setRefreshing] = useState(false);
  const [mapError, setMapError] = useState<string>('');
  const [longitude, setLongitude] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);

  const getEvents = () => {
    dispatch(getAllNextEvents())
    dispatch(getNearEvents({ latitude, longitude }))
  }


  useEffect(() => {
    (async () => {
      try {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (!granted) {
          setMapError("DEBES DAR PERMISOS PARA USAR EL MAPA")
          return;
        }

        const last: any = await Location.getLastKnownPositionAsync();

        if (last) {
          const { latitude, longitude } = last.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          dispatch(getNearEvents({ latitude, longitude }))
        }
        else {

          const current: any = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
          const { latitude, longitude, accuracy } = current.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          dispatch(getNearEvents({ latitude, longitude}))

        }
      } catch (error) {
        setMapError("No se pudo obtener la ubicación");
      }
    })();
  }, [id_log]);
  

  useLayoutEffect(() => {
    getEvents()
  }, [id_log])

  return (
    <ScrollView style={styles.root}
      refreshControl={
        <RefreshControl
          onRefresh={getEvents}
          refreshing={refreshing}
        />
      }
    >
      <HeaderHome navigation={navigation} />
      <View style={styles.wrapperUpcomingEvents}>
        <View style={styles.wrapperUpcomingEventHeader}>
          <Text style={styles.wrapperUpcomingEventTitle}>Próximos eventos</Text>
          <TouchableOpacity style={{ display: "flex", flexDirection: "row", alignItems: "center", marginRight: 15 }}>
            <Text onPress={() => navigation?.navigate("Events")} style={styles.textSeeAll}>Ver todos</Text>
            <Icon type='material-community' color={Colors.darkGray} size={15} name='arrow-right' />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.wrapperEventCards} >
          {
            nextEvents.map((event) => (
              <EventCard key={event?.id} id={event?.id} navigation={navigation} title={event?.title} address={event?.address} date={event?.start_date} imgUrl={event?.image?.image} />
            ))
          }
        </ScrollView>
      </View>
      <View style={styles.wrapperInviteFriend}>
        <InviteFriends />
      </View>
      <View style={styles.wrapperUpcomingEvents}>
        <View style={styles.wrapperUpcomingEventHeader}>
          <Text style={styles.wrapperUpcomingEventTitle}>Cerca a ti</Text>
          <TouchableOpacity style={{ display: "flex", flexDirection: "row", alignItems: "center", marginRight: 15 }}>
            <Text onPress={() => navigation?.navigate("Events")} style={styles.textSeeAll}>Ver todos</Text>
            <Icon type='material-community' color={Colors.darkGray} size={15} name='arrow-right' />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.wrapperEventCards} >
          {
            nearEvents?.map((event) => (
              <EventCard key={event?.id} id={event?.id} navigation={navigation} title={event?.title} address={event?.address} date={event?.start_date} imgUrl={event?.image?.image} />
            ))
          }
        </ScrollView>
      </View>
    </ScrollView>
  );
}
