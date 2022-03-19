import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { Icon } from 'react-native-elements';
import EventCard from '../../components/EventCard';
import HeaderHome from '../../components/HeaderHome';
import InviteFriends from '../../components/InviteFriends';
import Colors from '../../constants/Colors';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getAllEvents } from '../../redux/events/actions';

import styles from './styles';

export default function Home({ navigation }: any) {
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.events);
  const [refreshing, setRefreshing] = useState(false); 

  const getEvents = () => {
    dispatch(getAllEvents())
  }

  useLayoutEffect(() => {
    getEvents()
  }, [])

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
            <Text onPress={()=>navigation?.navigate("Events")}  style={styles.textSeeAll}>Ver todos</Text>
            <Icon type='material-community' color={Colors.darkGray} size={15} name='arrow-right' />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.wrapperEventCards} >
          {
            events.list.map((event) => (
              <EventCard key={event?.id} id={event?.id}  navigation={navigation}  title={event?.title} address={event?.address} date={event?.start_date} imgUrl={event?.image?.image} />
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
            <Text onPress={()=>navigation?.navigate("Events")}  style={styles.textSeeAll}>Ver todos</Text>
            <Icon type='material-community' color={Colors.darkGray} size={15} name='arrow-right' />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.wrapperEventCards} >
          {
            events.list.map((event) => (
              <EventCard key={event?.id} id={event?.id} navigation={navigation}  title={event?.title} address={event?.address} date={event?.start_date} imgUrl={event?.image?.image} />
            ))
          }
        </ScrollView>
      </View>
    </ScrollView>
  );
}
