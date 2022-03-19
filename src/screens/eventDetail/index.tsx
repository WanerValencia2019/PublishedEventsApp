import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';

import styles from './styles';
import axiosInstance from '../../helpers/axiosInstance';

const EventDetail = (props) => {
    const [event, setEvent] = useState({});
    useEffect(() => {
        axiosInstance().get("/event/detail/"+props.route.params.eventId+"/")
        .then((res)=>setEvent(res.data.data))
        .catch((err)=> console.log(err.response))
      }, [])

console.log('====================================');
console.log(event);
console.log('====================================');
  return (
    <View>
      <Text>EventDetail</Text>
    </View>
  )
}

export default EventDetail;