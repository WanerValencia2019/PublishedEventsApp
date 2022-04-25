import React, { useState, useEffect, ReactPropTypes } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';
import MapView,{ Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { fonts, headers } from '../../constants/Texts';
const { width, height } = Dimensions.get('screen');


const calcularDelta = (longitud: number, latitud: number, accuracy:number = 5) => {
    const oneDegreeOfLongitudMeters = 111.32;
    const circunference = 40075 / 360;
    const latDelta = accuracy * (1 / (Math.cos(latitud) * circunference));
    const lonDelta = accuracy / oneDegreeOfLongitudMeters;
    return {
        latDelta,
        lonDelta
    };
};

interface types {
    latitude: number,
    longitude: number,
    eventTitle: string,
}

const MapMarkerEvent:React.FC<types> = ({ latitude, longitude, eventTitle = "Ubicación del evento"}) => {
    const [error, setError] = useState('No hay coordenadas,Por favor verifica tu conexión');
    const [region, setRegion] = useState<any>(null);

    useEffect(() => {
        const { lonDelta, latDelta } = calcularDelta(
            longitude,
            latitude,
        );
        setRegion({
            latitude,
            longitude,
            latitudeDelta: latDelta,
            longitudeDelta: lonDelta
        });
    }, [longitude, latitude])

    return (
        <View style={styles.container}>
            {region ? (
                <>
                    <MapView
                        style={styles.mapStyle}
                        loadingEnabled
                        minZoomLevel={1}
                        maxZoomLevel={15}
                        showsUserLocation={true}
                        initialRegion={region}
                        region={region}
                    >
                     <Marker coordinate={{...region}} title={eventTitle} />
                    </MapView>
                </>
            ) : (
                <Text style={{ color: "rgba(255,0,0,.7)",fontFamily:fonts.Roboto_400Regular,fontWeight:"400", fontSize: headers.h5, marginTop: 30 }}>{error}</Text>
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
        height: height*.5
    }
});
export default MapMarkerEvent;