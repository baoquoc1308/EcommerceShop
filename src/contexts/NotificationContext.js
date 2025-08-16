import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = "info", duration = 3000) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      message,
      type,
      duration,
      timestamp: Date.now(),
    };

    setNotifications((prev) => [...prev, newNotification]);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const success = (message, duration) =>
    addNotification(message, "success", duration);
  const error = (message, duration) =>
    addNotification(message, "error", duration);
  const info = (message, duration) =>
    addNotification(message, "info", duration);
  const warning = (message, duration) =>
    addNotification(message, "warning", duration);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        clearAll,
        success,
        error,
        info,
        warning,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
