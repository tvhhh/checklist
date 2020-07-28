import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onRegister: function(token) {
    console.log('TOKEN:', token);
  },
  onNotification: function(notification) {
    console.log('NOTIFICATION:', notification);
  },
  onAction: function(notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);
  },
  onRegistrationError: function(err) {
    console.error(err.message, err);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: false,
});

export const scheduleNotification = (title, id_task, mess, time) => {
  PushNotification.localNotificationSchedule({
    id: id_task,
    title: title,
    message: mess,
    playSound: false,
    soundName: 'default',
    date: new Date(time),
  });
};

export const deleteNotification = (id_task) => {
  PushNotification.cancelLocalNotifications({id: id_task});
};

export const deleteAllNotification = () => {
  PushNotification.cancelAllLocalNotifications();
};
