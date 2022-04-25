import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { generateString } from '../../utils';


const {  height } = Dimensions.get('screen');

const calcularDelta = (longitud:any, latitud:any, accuracy:any) => {
  const oneDegreeOfLongitudMeters = 111.32;
  const circunference = 40075 / 360;
  const latDelta = accuracy * (1 / (Math.cos(latitud) * circunference));
  const lonDelta = accuracy / oneDegreeOfLongitudMeters;
  return {
    latDelta,
    lonDelta
  };
};

function MapMarker(props:any) {
  const { cordenadas, navigation, setmarker, marker } = props;

  const [error, setError] = useState('No hay coordenadas,Por favor verifica tu conexión');
  const [region, setRegion] = useState<any>(null);
  const [line, setline] = useState<any>(null);
  useEffect(() => {
    (async () => {
        try {
            const { granted } = await Location.requestForegroundPermissionsAsync();
            if (!granted) {
                setError("DEBES DAR PERMISOS PARA USAR EL MAPA")
                return;
            }

            const last: any = await Location.getLastKnownPositionAsync();

            if (last) {
                const { latitude, longitude, accuracy } = last.coords;
                const { lonDelta, latDelta } = calcularDelta(
                    longitude,
                    latitude,
                    accuracy
                );

                setRegion({
                    latitude,
                    longitude,
                    latitudeDelta: latDelta,
                    longitudeDelta: lonDelta
                });
            }
            else {

                const current: any = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
                console.log(" HOLA MUNDO " + current);
                const { latitude, longitude, accuracy } = current.coords;
                const { lonDelta, latDelta } = calcularDelta(
                    longitude,
                    latitude,
                    accuracy
                );
                setRegion({
                    latitude,
                    longitude,
                    latitudeDelta: latDelta,
                    longitudeDelta: lonDelta
                });
                console.log(accuracy)
            }
        } catch (error) {
            console.log("HOLEE " + error);
        }
    })();
  }, []);

  const ponerMarcador = (coordinate: any) => {
    setmarker([{ coordinate, inicio: region }]);
    //console.log(marker);
    const marcador = marker[0];
    console.log(marcador);
  };


  return (
    <View style={styles.container}>
      {region ? (
        <>
          <MapView
            style={styles.mapStyle}
            loadingEnabled
            minZoomLevel={1}
            maxZoomLevel={50}
            showsUserLocation={true}
            initialRegion={region}
            region={region}
            onPress={(e) => {
              ponerMarcador(e.nativeEvent.coordinate);
            }}>
            {marker.map((marker:any) => {
              return <Marker key={generateString()} {...marker} title='Ubicación del evento'></Marker>;
            })}
          </MapView>
        </>
      ) : (
        <Text style={{color:"rgba(255,0,0,.7)",fontSize:20,marginTop:30}}>{error}</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  mapStyle: {
    width: 360,
    height
  }
});
export default MapMarker;