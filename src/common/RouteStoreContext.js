import React, { createContext, useReducer } from "react";

export const SET_ROUTE = "SET_ROUTE";
export const SET_FOCUSED = "SET_FOCUSED";
export const SET_STATE = "SET_STATE";

export function setRoute(_, dispatch) {
  return route =>
    dispatch({
      type: SET_ROUTE,
      payload: route
    });
}

export function setRouteState(routeState, dispatch) {
  return state => {
    if (
      state.route === routeState.route &&
      state.focused === routeState.focused
    ) {
      return;
    }
    dispatch({
      type: SET_STATE,
      payload: state
    });
  };
}

export function setFocused(_, dispatch) {
  return focused =>
    dispatch({
      type: SET_FOCUSED,
      payload: focused
    });
}

export function getRoute(state) {
  return state.route;
}

export function getFocused(state) {
  return state.focused;
}

const initialState = {
  route: "/",
  focused: ""
};

function reducer(state, { type, payload }) {
  let newState = { ...state };
  if (type === SET_ROUTE) {
    newState.route = payload;
  }
  if (type === SET_FOCUSED) {
    newState.focused = payload;
  }
  if (type === SET_STATE) {
    newState = payload;
  }
  return newState;
}

const RouteContext = createContext();

export function RouteStoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <RouteContext.Provider value={{ state, dispatch }}>
      {children}
    </RouteContext.Provider>
  );
}

export default RouteContext;
