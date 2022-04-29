import { eventInitialType } from ".";



export const listEventsReducer = (state: eventInitialType, action: any)  => {
    state.list = action.payload.list;
}
export const listNextEventsReducer = (state: eventInitialType, action: any)  => {
    state.nextEvents = action.payload.list;
}

export const listNearEventsReducer = (state: eventInitialType, action: any)  => {
    state.nearEvents = action.payload.list;
}

export const listCategoriesReducer = (state: eventInitialType, action: any)  => {
    state.categories = action.payload.categories;
}


export const newEventInfoUpdateReducer = (state: eventInitialType, action: any)  => {
    state.newEvent.info.categories = action.payload?.categories && action.payload.categories;
    state.newEvent.info.description = action.payload?.description && action.payload.description;
    state.newEvent.info.space_availables = action.payload?.space_availables && action.payload.space_availables;
    state.newEvent.info.title =action.payload?.title && action.payload.title;
}

export const newEventPhotosUpdateReducer = (state: eventInitialType, action: any)  => {
    state.newEvent.photos.mainImage.base64 = action.payload?.base64 && action.payload.base64;
    state.newEvent.photos.mainImage.url = action.payload?.url && action.payload.url;
}

export const newEventDatesUpdateReducer = (state: eventInitialType, action: any)  => {
    state.newEvent.dates.end = action.payload?.end ||  state.newEvent.dates.end;
    state.newEvent.dates.limit = action.payload?.limit || state.newEvent.dates.limit;
    state.newEvent.dates.start = action.payload?.start || state.newEvent.dates.start;
}

export const newEventLocationUpdateReducer = (state: eventInitialType, action: any)  => {
    state.newEvent.location.address = action.payload?.address && action.payload.address;
    state.newEvent.location.latitude = action.payload?.latitude && action.payload.latitude;
    state.newEvent.location.longitude = action.payload?.longitude && action.payload.longitude;
}



interface newEventAddTicketProps {
    type: string;
    payload: {
        name: string;
        description: string;
        price: number;
        quantity: number;
    }
  }

export const newEventAddTicketReducer = (state: eventInitialType, action: any)  => {
    state.newEvent.tickets = [...state.newEvent.tickets, action.payload];
}