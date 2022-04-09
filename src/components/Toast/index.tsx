import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { Button } from 'react-native'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fonts, paragraphs } from '../../constants/Texts';

enum typeValues {
  success = 'success',
  error = 'error',
  info = 'info',
}

export interface initialToastType {
  type: string,
  message: string,
  message_two?: string,
}

export default function CustomToast(props: any) {
  const toast = useAppSelector(state => state.toast);
  const dispatch = useAppDispatch();
  const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    error: (props: any) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: paragraphs.pSmall,
          fontFamily: fonts.Roboto_100Thin
        }}
        text2Style={{
          fontSize: 15
        }}
      />
    ),
  }

  const showToast = ({ message, message_two, type }: initialToastType) => {
    switch (type) {
      case "success":
        Toast.show({
          type: 'success',
          text1: message,
        })
        break;
      case "error":
        Toast.show({
          type: 'error',
          text1: message,
        })
        break;
      case "info":
        Toast.show({
          type: 'info',
          text1: message,
        })
        break;
      default:
        Toast.show({
          type: 'info',
          text1: message,
        })
        break;
    }
  }
  3
  useEffect(() => {
    if (toast.show) {
      showToast({ message: toast.message, message_two: toast?.message_two, type: toast.type });
    } else {
      Toast.hide();
    }
  }, [toast.idLog])

  return (
    <Toast  config={toastConfig} />
  )
}