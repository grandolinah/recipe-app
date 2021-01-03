import { createContext, useContext } from 'react';

export const NotificationContext = createContext<any>({
  notification: {
    message: '',
    color: 'primary'
  },
  setNotification: () => {},
});

export const useNotificationContext = () => useContext(NotificationContext);
