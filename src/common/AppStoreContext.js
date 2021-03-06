import React, { createContext, useReducer } from "react";
import { get } from "lodash";
import uuid from "uuid/v4";
import * as containerStyles from "../constants/containerStyles";

// actions
export const SET_MODAL_ACTION = "SET_MODAL_ACTION";
export const UNSET_MODAL_ACTION = "UNSET_MODAL_ACTION";
export const SET_ABOUT_CARDS = "SET_ABOUT_CARDS";

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

const initialState = {
  modal: null,
  widgets: {
    about: {
      cards: [
        {
          id: uuid(),
          img: "https://img1.wsimg.com/isteam/stock/1036/:/rs=w:600,cg:true,m",
          containerStyle: containerStyles.vertical
        },
        {
          id: uuid(),
          img: "//img1.wsimg.com/isteam/stock/105588/:/rs=w:600,cg:true,m",
          containerStyle: containerStyles.vertical
        },
        {
          id: uuid(),
          img: "https://img1.wsimg.com/isteam/stock/1051/:/rs=w:600,cg:true,m",
          containerStyle: containerStyles.vertical
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
