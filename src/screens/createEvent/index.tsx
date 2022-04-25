import { View, Text, ScrollView } from 'react-native'
import React, { useCallback } from 'react'

import styles from "./styles";
import InfoStep from './infoStep';

import { FAB, Icon } from 'react-native-elements';
import Colors from '../../constants/Colors';
import PhotosStep from './photosStep';
import AddressStep from './addressStep';
import DateStep from './dateStep';
import TicketStep from './ticketStep';

const CreateEvent = () => {
  const steps = ["info", "photos", "tickets", "address", "dates",];
  const stepTitle: any = {
    info: "Información general",
    photos: "Imagen descriptiva",
    tickets: "Entradas - Tickets",
    address: "Dirección",
    dates: "Fechas",
  }
  const [step, setStep] = React.useState(steps[0]);
  const [disabledNext, setDisabledNext] = React.useState(false);
  const [disabledPrev, setDisabledPrev] = React.useState(true);

  const handleNext = useCallback(
    () => {
      const currentStepIndex = steps.indexOf(step);
      const nextStepIndex = currentStepIndex + 1;
  
      if (nextStepIndex > steps.length - 1) {
        setDisabledPrev(false);
        setDisabledNext(true);
        return;
      } else {
        setDisabledNext(false);
        setDisabledPrev(false);
      }
      const nextStep = steps[nextStepIndex];
      setStep(nextStep);
    },
    [step],
  )

 const handleBack = useCallback(
    () => {
      const currentStepIndex = steps.indexOf(step);
      const nextStepIndex = currentStepIndex - 1;
      if (nextStepIndex < 0) {
        setDisabledPrev(true);
        return;
      } else {
        setDisabledNext(false);
        setDisabledPrev(false);
      }
      const nextStep = steps[nextStepIndex];
      setStep(nextStep);
    },
    [step],
  )

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Text style={styles.newEvent}>{ stepTitle[step] }</Text>
      {
       step === "info" ? <InfoStep />: step === "photos" ? <PhotosStep />: step === "tickets" ? <TicketStep />: step === "address" ? <AddressStep />: step === "dates" ? <DateStep />: null
      }
      <View style={{ position: "absolute", left: 10, bottom: 10 }}>
        <FAB onPress={handleBack} disabled={disabledPrev} iconPosition='left' icon={<Icon type='material-community' name='arrow-left' color={Colors.light.background} />} title="Anterior" color={Colors.orange} />
      </View>
      <View style={{ position: "absolute", right: 10, bottom: 10 }}>
        <FAB onPress={handleNext} disabled={disabledNext} title="Siguiente" color={Colors.blue} iconPosition='right' icon={<Icon type='material-community' name='arrow-right' color={Colors.light.background} />} />
      </View>
    </ScrollView>
  )
}

export default CreateEvent;