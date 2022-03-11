import React, { useState, useEffect, ReactPropTypes } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
const { width, height } = Dimensions.get('screen');


const calcularDelta = (longitud: any, latitud: any, accuracy: any) => {
    const oneDegreeOfLongitudMeters = 111.32;
    const circunference = 40075 / 360;
    const latDelta = accuracy * (1 / (Math.cos(latitud) * circunference));
    const lonDelta = accuracy / oneDegreeOfLongitudMeters;
    return {
        latDelta,
        lonDelta
    };
};

function MapShow(props: any) {
    const [error, setError] = useState('No hay coordenadas,Por favor verifica tu conexión');
    const [region, setRegion] = useState<any>(null);

    useEffect(() => {
        (async () => {
            try {
                const { granted } = await Location.requestForegroundPermissionsAsync();
                if (!granted) return;
          
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
                  const current: any = await Location.getCurrentPositionAsync();
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
              } catch (error) {
                console.log(error);
              }
        })();
    }, []);


    const onUserPostionChange = (cordinate: any) => {
        const { latitude, longitude } = cordinate;
        console.log(`Nuevas coordenadas, lon:${longitude}, lati:${latitude}`);
        setRegion({
            ...region,
            latitude,
            longitude
        });
    };

    return (
        <View style={styles.container}>
            {region ? (
                <>
                    <MapView
                        style={styles.mapStyle}
                        followsUserLocation
                        loadingEnabled
                        minZoomLevel={15}
                        maxZoomLevel={22}
                        showsUserLocation={true}
                        initialRegion={region}
                        region={region}
                        >

                    </MapView>
                </>
            ) : (
                <Text style={{ color: "rgba(255,0,0,.7)", fontSize: 20, marginTop: 30 }}>{error}</Text>
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
export default MapShow;