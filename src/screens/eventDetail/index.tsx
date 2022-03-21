import { View, Text, Image, Dimensions, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';

import styles from './styles';
import axiosInstance from '../../helpers/axiosInstance';
import { Icon } from 'react-native-elements';
import Colors from '../../constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import MapShow from '../../components/MapShow';
import MapView from 'react-native-maps';
import MapMarkerEvent from '../../components/MapMarkerEvent';

const { width, height } = Dimensions.get("screen")

const EventDetail = (props) => {
  const [event, setEvent] = useState<any>(null);


  useEffect(() => {
    axiosInstance().get("/event/detail/" + props.route.params.eventId + "/")
      .then((res) => setEvent(res.data.data))
      .catch((err) => console.log(err.response))
  }, [])

  console.log('====================================');
  console.log(event);
  console.log('====================================');

  return (
    <ScrollView style={styles.root}>
      <ImageBackground imageStyle={{ resizeMode: "stretch" }} style={{ width: width, height: height * .4 }} source={{ uri: event?.image?.image }} >
        <View style={styles.overlay} />
      </ImageBackground>

      <Text style={styles.title} >{event?.title}</Text>
      <View style={styles.wrapperDescription}>
        <Text style={styles.sectionTitle}>Descripción</Text>
       <Text style={styles.description}>{event?.description}</Text>
      </View>
      <View style={{paddingLeft: 20, marginTop: 7}}>
        <Text style={styles.sectionTitle}>Fecha de inicio</Text>
        <View style={styles.wrapperDates}>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Icon type='material-community' name='calendar-outline' color={Colors.blue} style={{ padding: 5 }} />
            <View>
              <Text style={styles.dateText}>{new Date(event?.start_date).toDateString()}</Text>
              <Text style={styles.timeText}>{new Date(event?.start_date).toLocaleTimeString()}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{paddingLeft: 20, marginTop: 5}}>
        <Text style={styles.sectionTitle}>Fecha de finalización</Text>
        <View style={styles.wrapperDates}>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Icon type='material-community' name='calendar-outline' color={Colors.blue} style={{ padding: 5 }} />
            <View>
              <Text style={styles.dateText}>{new Date(event?.end_date).toDateString()}</Text>
              <Text style={styles.timeText}>{new Date(event?.end_date).toLocaleTimeString()}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{paddingLeft: 20, marginTop: 5}}>
        <Text style={styles.sectionTitle}>Ubicación</Text>
        <View style={styles.wrapperDates}>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Icon type='material-community' name='google-maps' color={Colors.blue} style={{ padding: 5 }} />
            <View>
              <Text style={styles.dateText}>{event?.address}</Text>
            </View>
          </View>
        </View>
      </View>
      {
        event  &&
        <MapMarkerEvent latitude={Number(event?.latitude)} longitude={Number(event?.longitude)} eventTitle={event?.title} />
      }
    </ScrollView>
  )
}

export default EventDetail;