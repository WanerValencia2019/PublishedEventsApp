import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';

import * as Location from 'expo-location';

import styles from './styles';
import { LocationObjectCoords } from 'expo-location';
import MapShow from '../../components/MapShow';

export default function MapViewScreen() {
  return (
    <View>
      <MapShow />
    </View>
  );
}
