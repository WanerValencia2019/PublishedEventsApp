import { View, Text, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'

import styles from "./styles";
import { SearchBar } from 'react-native-elements';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import SimpleCard from '../../components/SimpleCard';
import { ScrollView } from 'react-native-gesture-handler';
import { getAllEvents } from '../../redux/events/actions';

const Events = () => {
    const [search, setSearch] = useState("")
    const events = useAppSelector((state) => state.events);
    const dispatch = useAppDispatch();
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getEvents();
    }, [])

    const getEvents = () => {
        dispatch(getAllEvents())
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
                    events.list.map((event, i) => (
                        <SimpleCard key={event?.id} id={event?.id} date={event?.start_date} imageUrl={event?.image?.image} title={event?.title} />
                    ))
                }
            </ScrollView>
        </ScrollView>
    )
}

export default Events