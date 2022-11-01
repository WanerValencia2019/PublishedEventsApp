import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { fonts, headers } from '../constants/Texts'
import Colors from '../constants/Colors'

const ComingSoon = () => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Proximamente se habilitará esta opción, disfruta del resto de la aplicación</Text>
    </View>
  )
}

export default ComingSoon

const styles = StyleSheet.create({
    root: {
      flex: 1,
      justifyContent: 'center', 
      marginLeft: 20,
      marginRight: 20
    },
    text: {
        fontSize: headers.h5,
        fontFamily: fonts.Roboto_500Medium,
        color: Colors.blue,
    }
})