import { View, Text, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'

import styles from "./styles";
import { SearchBar } from 'react-native-elements';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import SimpleCard from '../../components/SimpleCard';
import { ScrollView } from 'react-native-gesture-handler';
import { getMyEvents } from '../../redux/events/actions';
import { useNavigation } from '@react-navigation/native';

const ListUserEvents = () => {
    const [search, setSearch] = useState("")
    const { myEvents } = useAppSelector((state) => state.events);
    const dispatch = useAppDispatch();
    const [refreshing, setRefreshing] = useState(false);
    const navigation:any = useNavigation();

    useEffect(() => {
        getEvents();
    }, [])

    const getEvents = () => {
        dispatch(getMyEvents())
    }

    const clickCard = (event:any) => {
        navigation.navigate("UserDetailEvent", { eventId: event.id })
    }

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    onRefresh={getEvents}
                    refreshing={refreshing}
                />
            }

            style={styles.root}>
            <View>
                <SearchBar containerStyle={{ backgroundColor: "transparent", borderTopWidth: 0, borderBottomWidth: 0, }} inputContainerStyle={{ backgroundColor: "transparent" }} value={search} onChangeText={(e) => setSearch(e)} lightTheme placeholder='Buscar...' />
            </View>
            <ScrollView>
                {
                    myEvents.map((event, i) => (
                        <SimpleCard onPress={()=>clickCard(event)} key={event?.id} id={event?.id} date={event?.start_date} imageUrl={event?.image?.image} title={event?.title} />
                    ))
                }
            </ScrollView>
        </ScrollView>
    )
}

export default ListUserEvents;