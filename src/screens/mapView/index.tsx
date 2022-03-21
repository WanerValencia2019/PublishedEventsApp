import React from 'react';
import { Text, View } from 'react-native';
import MapShow from '../../components/MapShow';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

export default function MapViewScreen() {
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.events);

  return (
    <View>
      {
        events?.list.length > 0 ?
          <MapShow events={events.list} /> :
          <Text>Loading...</Text>
      }
    </View>
  );
}
