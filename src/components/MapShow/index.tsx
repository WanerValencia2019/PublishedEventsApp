import React, { useState, useEffect, ReactPropTypes } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
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

function MapShow({ events }: any) {
    const [error, setError] = useState('No hay coordenadas,Por favor verifica tu conexión');
    const [region, setRegion] = useState<any>(null);
    const [markers, setMarkers] = useState<any>(null);

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


    useEffect(() => {
        const marks: any = []
        events && events?.forEach((event: any) => {
            const { lonDelta, latDelta } = calcularDelta(
                Number(event?.longitude),
                Number(event?.latitude),
                5
            );
            const marker: any = {
                title: event?.title,
                coordinate: {
                    longitude: Number(event?.longitude),
                    latitude: Number(event?.latitude),
                    latitudeDelta: latDelta,
                    longitudeDelta: lonDelta
                }
            }
            marks.push(marker)
        })
        setMarkers(marks);
    }, [events])
    console.log('====================================');
    console.log(region);
    console.log('====================================');

    return (
        <View style={styles.container}>
            {region ? (
                <>
                    <MapView
                        style={styles.mapStyle}
                        followsUserLocation
                        focusable
                        loadingEnabled
                        minZoomLevel={1}
                        maxZoomLevel={15}
                        showsUserLocation={true}
                        initialRegion={region}
                        region={region}
                    >
                        {markers &&
                            markers.map((marker: any, i: any) => {
                                return <Marker key={i} coordinate={{...marker.coordinate}} title={marker?.title} ></Marker>;
                            })}

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
        display: "flex",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    mapStyle: {
        width,
        height
    }
});
export default MapShow;