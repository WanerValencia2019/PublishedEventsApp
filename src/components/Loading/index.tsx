import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';
import { useAppSelector } from '../../hooks/redux';

const Loading = () => {
  const { show } = useAppSelector(state => state.loading);
  return (
    show && <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', zIndex: 9999999 }}>
      <ActivityIndicator size="large" color={Colors.blue} />
    </View>
  )

}

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20
  }
});