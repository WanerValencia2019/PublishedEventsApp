import React, { useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import MapShow from '../../components/MapShow';
import SimpleCard from '../../components/SimpleCard';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

const { width, height } = Dimensions.get("screen")

export default function MapViewScreen() {
  const dispatch = useAppDispatch();
  const [event, setEvent] = useState<any>(null);
  const events = useAppSelector((state) => state.events);

  const pressMarker = (marker: any) => {
    setEvent(marker);
    console.log('pressMarker');
    console.log(marker);
  }

  const touchMap = () => {
    setEvent(null);
  }

  console.log(event);
  

  return (
    <View>
      {
        events?.list.length > 0 ?
          <MapShow pressMarker={pressMarker} pressMap={touchMap} events={events.list} /> :
          <Text>Loading...</Text>
      }
      {
        event && (
          <View style={{bottom: -height*0.636, left: 0, right: 0}}>
            <SimpleCard date={event?.start_date} id={event?.id} imageUrl={event?.image} title={event?.title}  />
          </View>
        )
      }
    </View>
  );
}
