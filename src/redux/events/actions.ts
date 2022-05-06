import { AsyncThunkPayloadCreator, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { AppDispatch } from "..";
import { uploadImage } from "../../utils/s3aws";
import { EventTypes } from "../actionTypes";
import { startLoading, stopLoading } from "../loading/actions";
import { showToast } from "../toast/actions";

import axiosInstance from "./../../helpers/axiosInstance";

export const getAllNextEvents = createAsyncThunk(
  "events/list",
  async (props, { dispatch }) => {
    dispatch(startLoading());
    axiosInstance(dispatch)
      .get("/events/list?status=active")
      .then((res: AxiosResponse) => {
        const { data } = res.data;
        return dispatch({
          type: EventTypes.listNextEventSuccess,
          payload: {
            list: data,
          },
        });
      })
      .catch((error: AxiosError) => {
        console.log(error);
        return dispatch({
          type: EventTypes.listEventsFailed,
          payload: {
            message: "Error en los eventos",
          },
        });
      })
      .finally(() => dispatch(stopLoading()));
  }
);
export const getAllEvents = createAsyncThunk(
  "events/list",
  async (props, { dispatch }) => {
    dispatch(startLoading());
    axiosInstance(dispatch)
      .get("/events/list/")
      .then((res: AxiosResponse) => {
        const { data } = res.data;
        return dispatch({
          type: EventTypes.listEventsSuccess,
          payload: {
            list: data,
          },
        });
      })
      .catch((error: AxiosError) => {
        console.log(error);
        return dispatch({
          type: EventTypes.listEventsFailed,
          payload: {
            message: "Error en los eventos",
          },
        });
      })
      .finally(() => dispatch(stopLoading()));
  }
);

interface nearEventsParams {
  latitude: number;
  longitude: number;
}

export const getNearEvents = createAsyncThunk(
  "events/list",
  async ({ latitude, longitude }: nearEventsParams, { dispatch }) => {
    dispatch(startLoading());
    axiosInstance(dispatch)
      .get(`/events/nearby?latitude=${latitude}&longitude=${longitude}`)
      .then((res: AxiosResponse) => {
        const { data } = res.data;
        return dispatch({
          type: EventTypes.listNearEventsSuccess,
          payload: {
            list: data,
          },
        });
      })
      .catch((error: AxiosError) => {
        return dispatch({
          type: EventTypes.listNearEventsFailed,
          payload: {
            message: "Error en los eventos",
          },
        });
      })
      .finally(() => dispatch(stopLoading()));
  }
);

export const getCategories = createAsyncThunk(
  "events/list",
  async (data, { dispatch }) => {
    dispatch(startLoading());
    axiosInstance(dispatch)
      .get(`/events/categories/`)
      .then((res: AxiosResponse) => {
        const { data } = res.data;
        return dispatch({
          type: EventTypes.listCategoryEventsSuccess,
          payload: {
            categories: data,
          },
        });
      })
      .catch((error: AxiosError) => {
        return dispatch({
          type: EventTypes.listCategoryEventsFailed,
          payload: {
            message: "Error en los eventos",
          },
        });
      })
      .finally(() => dispatch(stopLoading()));
  }
);

interface infoUpdate {
  title?: string;
  description?: string;
  space_availables?: number;
  categories?: string[];
}

export const newEventInfoUpdate =
  ({ categories, description, space_availables, title }: infoUpdate) =>
  (dispatch: AppDispatch) => {
    return dispatch({
      type: EventTypes.newEventInfoUpdated,
      payload: {
        categories,
        description,
        space_availables,
        title,
      },
    });
  };

interface photosUpdate {
  photos: {
    mainImage: {
      url: string;
      imageName: string;
    };
  };
}

export const newEventPhotos =
  ({
    photos: {
      mainImage: { imageName, url },
    },
  }: photosUpdate) =>
  (dispatch: AppDispatch) => {
    return dispatch({
      type: EventTypes.newEventPhotosUpdated,
      payload: {
        imageName,
        url,
      },
    });
  };

interface newEventAddTicketProps {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export const newEventAddTicket =
  (data: newEventAddTicketProps) => (dispatch: AppDispatch) => {
    return dispatch({
      type: EventTypes.newEventAddTicket,
      payload: {
        ...data,
      },
    });
  };

interface newEventLocationProps {
  address: string;
  latitude: number;
  longitude: number;
}

export const newEventLocation =
  (data: newEventLocationProps) => (dispatch: AppDispatch) => {
    return dispatch({
      type: EventTypes.newEventLocationUpdated,
      payload: {
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
      },
    });
  };

interface newEventDatesProps {
  limit?: string;
  start?: string;
  end?: string;
}

export const newEventDates =
  (data: newEventDatesProps) => (dispatch: AppDispatch) => {
    return dispatch({
      type: EventTypes.newEventDateUpdated,
      payload: {
        limit: data?.limit,
        start: data?.start,
        end: data?.end,
      },
    });
  };

interface ticketTypes {
  name: string;
  description: string;
  price: number;
  quantity: number;
}
interface newEventTypes {
  info: {
    title: string;
    description: string;
    space_availables: number;
    categories: string[];
  };
  photos: {
    mainImage: {
      url: string;
      imageName: string;
    };
  };
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  dates: {
    limit: string;
    start: string;
    end: string;
  };
  tickets: Array<ticketTypes>
  navigate: any;
}

export const createEvent = createAsyncThunk(
  "events/create",
  async (data: newEventTypes, { dispatch, getState }:any) => {
    dispatch(startLoading());
    const { token } = getState().auth;
    
    const headers = {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    }
    
    const data_to_send = {
      end_date: data.dates.end,
      sell_limit_date: data.dates.limit,
      start_date: data.dates.start,
      description: data.info.description,
      space_available: Number(data.info.space_availables),
      title: data.info.title,
      images: {
        mainImage: "",
      },
      categories: data.info.categories,
      address: data.location.address,
      latitude: data.location.latitude,
      longitude: data.location.longitude,
      tickets: data.tickets.map((ticket) => ({
        unit_price: Number(ticket.price),
        ...ticket,
      })),
    };
    const image_url:any = await uploadImage(data.photos.mainImage.url, data.photos.mainImage.imageName)
    console.log(image_url);
    
    if(!image_url) {
      dispatch(showToast({ message: "Error al crear el evento, intentalo nuevamente", type: "error" }));
      return dispatch({
        type: EventTypes.createEventFailed,
        payload: {
          message: "Error en la imagen",
        },
      });
    }
    data_to_send.images.mainImage = image_url;

    axiosInstance(dispatch)
      .post("/events/create/", data_to_send, {
        headers,
      })
      .then((res: AxiosResponse) => {
        const { data: result } = res.data;
        dispatch(showToast({message: "Evento creado con éxito", type: "success"}));
        if (data.navigate){
          data.navigate("Home");
        } 
        return dispatch({
          type: EventTypes.createEventSuccess,
          payload: {
            event: result,
          },
        });
      })
      .catch((error: AxiosError) => {
        console.log('====================================');
        console.log(error.message);
        console.log(error.response?.request);
        console.log(error.response?.data);
        console.log('====================================');
        dispatch(showToast({ message: "Error al crear el evento, intentalo nuevamente", type: "error" }));
        return dispatch({
          type: EventTypes.createEventFailed,
          payload: {
            message: "Error en el evento",
          },
        });
      })
      .finally(() => dispatch(stopLoading()));
  }
);
