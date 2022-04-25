import { View, Text, Dimensions, StyleSheet, Image } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import { Button, Icon } from 'react-native-elements';
import Colors from '../../constants/Colors';

const PhotosStep = () => {
  const [image, setImage] = React.useState<any>(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return (
    <View style={styles.root}>
      <Button type='clear'  iconPosition='right' icon={<Icon type="material-community" name='camera-outline' color={Colors.blue} />} titleStyle={{color: Colors.blue}}  title={image ? "Cambiar imagen": "Seleccionar imagen"} onPress={pickImage} />
      {image && <Image source={{ uri: image }}  style={{ width: "100%", height:height*.5, resizeMode: "contain" }} />}
    </View>
  )
}

const { height } = Dimensions.get("screen");

const styles = StyleSheet.create({
    root: {
        marginTop: height * 0.05,
        marginBottom: height * 0.12,
    }
})
export default PhotosStep;