import { createAction, createReducer } from "@reduxjs/toolkit";
import { generateString } from "../../utils";
import { EventTypes } from "../actionTypes";
import {
  listCategoriesReducer,
  listEventsReducer,
  listMyAssistsReducer,
  listMyEventsReducer,
  listNearEventsReducer,
  listNextEventsReducer,
  newEventAddTicketReducer,
  newEventDatesUpdateReducer,
  newEventInfoUpdateReducer,
  newEventLocationUpdateReducer,
  newEventPhotosUpdateReducer,
} from "./reducers";

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
  tickets: Array<ticketTypes>;
}
export interface eventInitialType {
  list: Array<any>;
  nextEvents: Array<any>;
  myEvents: Array<any>;
  nearEvents: Array<any>;
  newEvent: newEventTypes;
  myAssists: Array<any>;
  categories: Array<{ id: string; name: string; description: string }>;
  id_log?: string;
}

const initialState: eventInitialType = {
  list: [],
  nextEvents: [],
  nearEvents: [],
  myEvents: [],
  myAssists: [],
  newEvent: {
    info: {
      title: "",
      description: "",
      space_availables: 0,
      categories: [],
    },
    photos: {
      mainImage: {
        url: "",
        imageName: "",
      },
    },
    location: {
      address: "",
      latitude: 0,
      longitude: 0,
    },
    dates: {
      limit: "",
      start: "",
      end: "",
    },
    tickets: [],
  },

  categories: [],
  id_log: generateString()
};

const listEventsAction = createAction<eventInitialType>(
  EventTypes.listEventsSuccess
);
const listNextEventAction = createAction<eventInitialType>(
  EventTypes.listNextEventSuccess
)
const listNearEventsAction = createAction<eventInitialType>(
  EventTypes.listNearEventsSuccess
);
const listCategoryEventsAction = createAction<eventInitialType>(
  EventTypes.listCategoryEventsSuccess
);
const newEventInfoUpdateAction = createAction<eventInitialType>(EventTypes.newEventInfoUpdated);
const newEventPhotosUpdateAction = createAction<eventInitialType>(EventTypes.newEventPhotosUpdated);
const newEventDatesUpdateAction = createAction<eventInitialType>(EventTypes.newEventDateUpdated);
const newEventLocationUpdateAction = createAction<eventInitialType>(EventTypes.newEventLocationUpdated);
const newEventAddTicker = createAction<eventInitialType>(EventTypes.newEventAddTicket);
const createEventAction = createAction<eventInitialType>(EventTypes.createEventSuccess);

const listMyEventsAction = createAction<eventInitialType>(EventTypes.listMyEventsSuccess);

const listMyAssistsAction = createAction<eventInitialType>(EventTypes.listMyAssistsSuccess);

export default createReducer(initialState, (builder) => {
  builder.addCase(listEventsAction, listEventsReducer);
  builder.addCase(listMyEventsAction, listMyEventsReducer);
  builder.addCase(listNextEventAction, listNextEventsReducer);
  builder.addCase(listNearEventsAction, listNearEventsReducer);
  builder.addCase(listCategoryEventsAction, listCategoriesReducer); 
  builder.addCase(newEventInfoUpdateAction, newEventInfoUpdateReducer);
  builder.addCase(newEventPhotosUpdateAction, newEventPhotosUpdateReducer);
  builder.addCase(newEventDatesUpdateAction, newEventDatesUpdateReducer);
  builder.addCase(newEventLocationUpdateAction, newEventLocationUpdateReducer);
  builder.addCase(newEventAddTicker, newEventAddTicketReducer);
  builder.addCase(createEventAction, (state, action) => {
    state.newEvent = initialState.newEvent;
    state.id_log = generateString()
  });
  builder.addCase(listMyAssistsAction, listMyAssistsReducer);
});
