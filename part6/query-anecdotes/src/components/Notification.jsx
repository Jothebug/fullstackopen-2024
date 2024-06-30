import React, { useEffect } from "react";
import { useNotification } from "../context/Notifcation";

const Notification = () => {
  const { state = {}, dispatch } = useNotification();

  useEffect(() => {
    if (state.isVisible) {
      const timer = setTimeout(() => {
        dispatch({ type: "HIDE" });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [state.isVisible, dispatch]);

  if (!state.isVisible) return null;

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  return <div style={style}>{state.message}</div>;
};

export default Notification;
