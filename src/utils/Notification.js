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

export const scheduleNotification = (id, title, time) => {
  var upcomingTime = new Date(time);
  upcomingTime.setMinutes(upcomingTime.getMinutes() - 30);
  var expiredTime = new Date(time);
  PushNotification.localNotificationSchedule({
    id: JSON.stringify(id),
    userInfo: { id: JSON.stringify(id) },
    title: title,
    message: "Your task will end in a few minutes.",
    playSound: false,
    soundName: 'default',
    date: upcomingTime,
  });
  PushNotification.localNotificationSchedule({
    id: JSON.stringify(-id),
    userInfo: { id: JSON.stringify(-id) },
    title: title,
    message: "Your task has expired.",
    playSound: false,
    soundName: 'default',
    date: expiredTime,
  });
};

export const deleteNotification = id => {
  PushNotification.cancelLocalNotifications({ id: JSON.stringify(id) });
  PushNotification.cancelLocalNotifications({ id: JSON.stringify(-id) });
};

export const deleteAllNotification = () => {
  PushNotification.cancelAllLocalNotifications();
};
