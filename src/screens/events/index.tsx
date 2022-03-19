import { View, Text } from 'react-native'
import React, { useState } from 'react'

import styles from "./styles";
import { SearchBar } from 'react-native-elements';
import { useAppSelector } from '../../hooks/redux';
import SimpleCard from '../../components/SimpleCard';
import { ScrollView } from 'react-native-gesture-handler';

const Events = () => {
    const [search, setSearch] = useState("")
    const events = useAppSelector((state) => state.events);

    return (
        <View style={styles.root}>
            <View>
                <SearchBar  containerStyle={{ backgroundColor: "transparent", borderTopWidth: 0, borderBottomWidth: 0, }} inputContainerStyle={{ backgroundColor: "transparent" }} value={search} onChangeText={(e) => setSearch(e)} lightTheme placeholder='Buscar...' />
            </View>
            <ScrollView>
                {
                    events.list.map((event,i)=>(
                        <SimpleCard key={i} date={event?.start_date} imageUrl={event?.image?.image} title={event?.title} />
                    ))
                }
            </ScrollView>
        </View>
    )
}

export default Events