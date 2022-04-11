import { AxiosError } from "axios";

export const formatValue = (value: any) =>
    Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumSignificantDigits: 10,
        notation: 'compact',
    }).format(value);

export const generateString = () =>
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

export const handleErrorHttp = (err: AxiosError) => {
    let message = 'Error de conexión';
    if (err?.response?.status === 400) {
        message = err?.response?.data?.message || 'Error de conexión';
        return message;
    }
    if (err?.response?.status === 422) {
        message = err?.response?.data?.message || 'Error de conexión';
        return message;
    }
    return message;
};

export const calcularDelta = (longitud: any, latitud: any, accuracy: any) => {
    const oneDegreeOfLongitudMeters = 111.32;
    const circunference = 40075 / 360;
    const latDelta = accuracy * (1 / (Math.cos(latitud) * circunference));
    const lonDelta = accuracy / oneDegreeOfLongitudMeters;
    return {
        latDelta,
        lonDelta
    };
};