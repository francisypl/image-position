import React, { createContext, useReducer } from "react";
import { get } from "lodash";
import uuid from "uuid/v4";
import * as containerStyles from "../constants/containerStyles";

// actions
export const SET_MODAL_ACTION = "SET_MODAL_ACTION";
export const UNSET_MODAL_ACTION = "UNSET_MODAL_ACTION";
export const SET_ABOUT_CARDS = "SET_ABOUT_CARDS";
export const SET_WELCOME = "SET_WELCOME";

export function setWelcome(state, dispatch) {
  return newWelcome => {
    const welcome = getWelcome(state);
    const payload = { ...welcome, ...newWelcome };
    dispatch({
      type: SET_WELCOME,
      payload
    });
  };
}

export function setAboutProperty(state, dispatch) {
  return image => {
    const aboutCards = getAboutCards(state);
    dispatch({
      type: SET_ABOUT_CARDS,
      payload: aboutCards.map(card => {
        if (card.id === image.id) {
          const containerStyle = image.containerStyle || card.containerStyle;
          if (image.pos) {
            card.pos = { ...card.pos, [containerStyle]: image.pos };
            delete image.pos;
          }
          if (image.scale) {
            card.scale = { ...card.scale, [containerStyle]: image.scale };
            delete image.scale;
          }
          return { ...card, ...image };
        } else if (!image.id) {
          return { ...card, ...image };
        }
        return card;
      })
    });
  };
}

// selectors
export function getAboutCards(state) {
  return get(state, "widgets.about.cards", []);
}

export function getWelcome(state) {
  return get(state, "widgets.welcome", {});
}

export function getAllImages(state) {
  return get(state, "images", []);
}

const images = [
  "//img1.wsimg.com/isteam/stock/Q3qWgnw",
  "//img1.wsimg.com/isteam/stock/105065",
  "//img1.wsimg.com/isteam/stock/105588",
  "//img1.wsimg.com/isteam/stock/105589",
  "//img1.wsimg.com/isteam/stock/QBBljG5",
  "//img1.wsimg.com/isteam/stock/105591",
  "//img1.wsimg.com/isteam/stock/105592",
  "//img1.wsimg.com/isteam/stock/Y8odJ5Y",
  "//img1.wsimg.com/isteam/stock/11931",
  "//img1.wsimg.com/isteam/stock/11936",
  "//img1.wsimg.com/isteam/stock/11938",
  "//img1.wsimg.com/isteam/stock/11947",
  "//img1.wsimg.com/isteam/stock/7792",
  "//img1.wsimg.com/isteam/stock/7804"
];

const initialState = {
  modal: null,
  images,
  widgets: {
    welcome: {
      img: images[0],
      containerStyle: containerStyles.vertical
    },
    about: {
      cards: [
        {
          img: images[1],
          id: uuid(),
          containerStyle: containerStyles.square
        },
        {
          id: uuid(),
          img: images[2],
          containerStyle: containerStyles.square
        },
        {
          id: uuid(),
          img: images[3],
          containerStyle: containerStyles.square
        }
      ]
    }
  }
};

function reducer(state, { type, payload }) {
  const newState = { ...state };
  if (type === SET_MODAL_ACTION) {
    newState.modal = payload;
    return newState;
  }
  if (type === UNSET_MODAL_ACTION) {
    newState.modal = null;
    return newState;
  }
  if (type === SET_ABOUT_CARDS) {
    newState.widgets.about.cards = payload;
    return newState;
  }
  if (type === SET_WELCOME) {
    newState.widgets.welcome = payload;
    return newState;
  }
  return state;
}

const AppContext = createContext();

export function AppStoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
