import { View, Text, Dimensions, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { Button, FAB, Icon } from 'react-native-elements';
import Colors from '../../constants/Colors';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { showToast } from '../../redux/toast/actions';
import { newEventPhotos } from '../../redux/events/actions';

const PhotosStep = ({ handleBack, handleNext }) => {
  const [image, setImage] = React.useState<any>(null);
  const [imageBase64, setImageBase64] = React.useState<any>(null);
  const dispatch = useAppDispatch();
  const { newEvent: { photos } } = useAppSelector(state => state.events)
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setImageBase64(result.base64);
      setImage(result.uri);
    }
  };

  useEffect(() => {
    setImage(photos.mainImage.url.length > 0 ? photos.mainImage.url : null);
  }, [])

  const onSubmit = () => {
    if(!image) {
      dispatch(showToast({"message": "Debes seleccionar una imagen", "type": "error"}));
    } else{
      dispatch(newEventPhotos({photos: { mainImage: { base64: imageBase64, url: image} }}))
      handleNext();
    }
  }
  return (
    <View style={styles.root}>
      <Button type='clear' iconPosition='right' icon={<Icon type="material-community" name='camera-outline' color={Colors.blue} />} titleStyle={{ color: Colors.blue }} title={image ? "Cambiar imagen" : "Seleccionar imagen"} onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: "100%", height: height * .5, resizeMode: "contain" }} />}
      <View style={{ position: "absolute", left: 0, bottom: 0 }}>
        <FAB onPress={handleBack} disabled={false} iconPosition='left' icon={<Icon type='material-community' name='arrow-left' color={Colors.light.background} />} title="Anterior" color={Colors.orange} />
      </View>
      <View style={{ position: "absolute", right: 0, bottom: 0 }}>
        <FAB onPress={onSubmit} disabled={false} title="Siguiente" color={Colors.blue} iconPosition='right' icon={<Icon type='material-community' name='arrow-right' color={Colors.light.background} />} />
      </View>
    </View>
  )
}

const { height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  root: {
    marginTop: height * 0.05,
    height: "85%"
  }
})
export default PhotosStep;