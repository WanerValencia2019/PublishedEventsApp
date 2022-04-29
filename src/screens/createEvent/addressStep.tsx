import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FAB, Icon, Input } from 'react-native-elements';
import { fonts, paragraphs } from '../../constants/Texts';
import MapMarker from '../../components/MapMarker';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { showToast } from '../../redux/toast/actions';
import { newEventLocation } from '../../redux/events/actions';

interface AddressStepForm {
  address: string
}

const AddressStep = ({ handleBack, handleNext }: any) => {
  const { handleSubmit, register, formState: { errors }, control, setValue } = useForm<AddressStepForm>();
  const [marker, setmarker] = useState<any>([]);
  const dispatch = useAppDispatch();
  const { newEvent: { location } } = useAppSelector(state => state.events)


  useEffect(() => {
    setValue('address', location.address)
    if (location.latitude !== 0 && location.longitude !== 0) {
      setmarker((prev: any) => ([{
        coordinate: {
          longitude: location.longitude,
          latitude: location.latitude
        }
      }]))
    }
  }, [])

  const onSubmit = (data: AddressStepForm) => {
    const { address } = data;
    const marker_selected = marker[0];

    if (!marker_selected) {
      dispatch(showToast({ message: "Debes seleccionar la ubicación en el mapa", type: "error" }))
      return;
    }
    dispatch(newEventLocation({
      address,
      latitude: marker_selected?.coordinate?.latitude,
      longitude: marker_selected?.coordinate?.longitude,
    }))

    handleNext();
  }

  return (
    <ScrollView style={styles.root}>
      <Controller
        rules={{
          required: {
            value: true,
            message: "Este campo es requerido"
          }
        }}
        control={control}
        name="address"
        render={({ field }) => (
          <Input {...field}
            placeholder='Dirección'
            textContentType='location'
            onChangeText={(text) => setValue("address", text)}
            errorMessage={errors.address?.message}
          />
        )}

      />
      <Text style={styles.text}>Selecciona la ubicación en el mapa</Text>
      <View style={styles.wrapperMap}>
        <MapMarker marker={marker} setmarker={setmarker} />
      </View>
      <View style={{ position: "absolute", left: 0, right: 0, bottom: height * 0.424 }}>
        <View style={{ position: "absolute", left: 0, bottom: 10 }}>
          <FAB onPress={handleBack} disabled={false} iconPosition='left' icon={<Icon type='material-community' name='arrow-left' color={Colors.light.background} />} title="Anterior" color={Colors.orange} />
        </View>
        <View style={{ position: "absolute", right: 0, bottom: 10 }}>
          <FAB onPress={handleSubmit(onSubmit)} disabled={false} title="Siguiente" color={Colors.blue} iconPosition='right' icon={<Icon type='material-community' name='arrow-right' color={Colors.light.background} />} />
        </View>
      </View>
    </ScrollView>
  )
}

const { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  root: {
    marginTop: height * 0.03,
    paddingBottom: height * 0.09,
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