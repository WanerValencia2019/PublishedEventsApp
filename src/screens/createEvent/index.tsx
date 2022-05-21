import { View, Text, ScrollView } from 'react-native'
import React, { useCallback, useEffect } from 'react'

import styles from "./styles";
import InfoStep from './infoStep';

import { FAB, Icon } from 'react-native-elements';
import Colors from '../../constants/Colors';
import PhotosStep from './photosStep';
import AddressStep from './addressStep';
import DateStep from './dateStep';
import TicketStep from './ticketStep';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useNavigation } from '@react-navigation/native';
import useEffectOnce from '../../hooks/useEffectOnce';
import { showToast } from '../../redux/toast/actions';

const CreateEvent = () => {
  const dispatch = useAppDispatch();
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
      <Text style={styles.newEvent}>{stepTitle[step]}</Text>
      {
        step === "info" ? <InfoStep handleBack={handleBack} handleNext={handleNext} /> : step === "photos" ? <PhotosStep handleBack={handleBack} handleNext={handleNext} /> : step === "tickets" ? <TicketStep handleBack={handleBack} handleNext={handleNext} /> : step === "address" ? <AddressStep handleBack={handleBack} handleNext={handleNext} /> : step === "dates" ? <DateStep handleBack={handleBack} handleNext={handleNext}  /> : null
      }
    </ScrollView>
  )
}

export default CreateEvent;