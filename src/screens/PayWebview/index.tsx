import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import WebView from 'react-native-webview';
import { useAppDispatch } from '../../hooks/redux';
import { startLoading, stopLoading } from '../../redux/loading/actions';
import { useNavigation } from '@react-navigation/native';
import { showToast } from '../../redux/toast/actions';

const PayWebView = ({ route }: any) => {
    const { url } = route.params;
    const dispatch = useAppDispatch();
    const navigation = useNavigation();

    const first_url_response = "/co/response"
    const second_url_response = "https://published-events.herokuapp.com/published_events_deploy/api/payment/payu/response"

    useEffect(() => {
      return () => {
        dispatch(stopLoading());
      };
    }, [])

    return (
        <WebView source={{ uri: url }}
            javaScriptEnabled
            domStorageEnabled
            pullToRefreshEnabled
            textInteractionEnabled
            cacheEnabled
            scrollEnabled
            onLoadEnd={() => dispatch(stopLoading())}
            onLoadStart={() => dispatch(startLoading())}
            onLoadProgress={({ nativeEvent }) => {
                if(nativeEvent.progress === 1) {
                    dispatch(stopLoading());
                }else {
                    dispatch(startLoading());
                }                
            }}
            onNavigationStateChange={(state) => {
                const { url: currentUrl } = state;
                if (currentUrl.split("#")[1]  === first_url_response) {
                    dispatch(showToast({ message: "Selecciona regresar al sitio de la tienda", type: "info" }));
                }
                if (currentUrl.split("?")[0] === second_url_response) {
                    if (currentUrl.includes("lapResponseCode=APPROVED")) {
                        dispatch(showToast({ message: "Pago realizado con éxito", type: "success" }));
                        navigation.navigate("Drawer");
                    } else {
                        dispatch(showToast({ message: "Pago rechazado", type: "error" }));
                        navigation.navigate("Drawer");
                    }
                }
            }}
        />
    )
}

export default PayWebView;

const styles = StyleSheet.create({})