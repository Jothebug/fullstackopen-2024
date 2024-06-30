import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  message: "",
  isVisible: false,
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return {
        isVisible: true,
        message: action.message,
      };
    case "HIDE":
      return initialState;
    default:
      return state;
  }
};

const NotificationContext = createContext();
const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);
  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context) return context;
};

export { NotificationProvider, useNotification };
