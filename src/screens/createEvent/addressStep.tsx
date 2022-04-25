import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Input } from 'react-native-elements';
import { fonts, paragraphs } from '../../constants/Texts';
import MapMarker from '../../components/MapMarker';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';

const AddressStep = () => {
  const [marker, setmarker] = useState<any>([]);
  console.log("marker", marker);
  
  return (
    <ScrollView style={styles.root}>
      <Input placeholder='Dirección' textContentType='location' /> 
      <Text style={styles.text}>Selecciona la ubicación en el mapa</Text>
      <View style={styles.wrapperMap}>
          <MapMarker marker={marker} setmarker={setmarker} />
      </View>
    </ScrollView>
  )
}

const { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
    root: {
        marginTop: height * 0.03,
        marginBottom: height * 0.09,
    },
    text: {
        fontFamily: fonts.Roboto_400Regular,
        fontSize: paragraphs.pLarge,    
        marginLeft: width * 0.03,
        color: Colors.darkBlueText
    },
    wrapperMap: {
        marginLeft: width * 0.03,
    }
})

export default AddressStep;