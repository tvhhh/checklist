import firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyBfZjRzGXUE3hpv718gFxr1Ir5pvFKWkmY",
  authDomain: "todos-f0b71.firebaseapp.com",
  databaseURL: "https://todos-f0b71.firebaseio.com",
  projectId: "todos-f0b71",
  storageBucket: "todos-f0b71.appspot.com",
  messagingSenderId: "32907944673",
  appId: "1:32907944673:web:3b0c27a619f044eb978da0",
  measurementId: "G-YVR9FCCVND"
};

const USER_ASYNC_STORAGE_KEY = '@TodoApp:UserDB';
const TASKS_ASYNC_STORAGE_KEY = '@TodoApp:TaskDB';

export const initializeApp = () => {
  firebase.initializeApp(firebaseConfig);
};

export const createUser = data => {
  var ref = firebase.database().ref(`users/${data.username}`);
  ref.set({ ...data, tasks: "[]", groups: "[]" });
};

export const removeUser = username => {
  var ref = firebase.database().ref(`users/${username}`);
  ref.remove()
  .catch(error => console.log(`Firebase - Remove user: ${error}`));
};

export const isUsernameExisting = username => {
  var ref = firebase.database().ref(`users/${username}`);
  return ref.once('value')
  .then(snapshot => snapshot.exists());
};

export const isEmailExisting = email => {
  var ref = firebase.database().ref('users');
  return ref.orderByChild('email').equalTo(email).once('value')
  .then(snapshot => snapshot.exists());
};

export const authorize = (username, password) => {
  var ref = firebase.database().ref(`users/${username}`);
  return ref.once('value')
  .then(snapshot => snapshot.exists() && snapshot.child('password').val() === password)
  .catch(error => console.log(`Firebase - Authorize: ${error}`));
};

export const fetchUserData = username => {
  var ref = firebase.database().ref(`users/${username}`);
  return ref.once('value')
  .then(snapshot => snapshot.val())
  .then(data => ({
    ...data,
    tasks: JSON.parse(data.tasks).map(item => ({
      ...item,
      dueTime: new Date(item.dueTime),
    })),
    groups: JSON.parse(data.groups),
  }))
  .catch(error => console.log(`Firebase - Fetch user data: ${error}`));
};

export const updateUserData = (username, value, key) => {
  var ref = firebase.database().ref(`users/${username}`);
  if (key) {
    ref.child(key).set(value);
  } else {
    var data = {
      ...value,
      tasks: JSON.stringify(value.tasks),
      groups: JSON.stringify(value.groups),
    };
    ref.set(data);
  }
};

export const fetchLocalUserData = () => {
  return AsyncStorage.getItem(USER_ASYNC_STORAGE_KEY)
  .then(response => (response !== null) ? JSON.parse(response) : null)
  .then(data => (data !== null) ?
    {
      ...data,
      tasks: data.tasks.map(item => ({
        ...item,
        dueTime: new Date(item.dueTime),
      })),
    } : null)
  .catch(error => console.log(`AsyncStorage - Fetch user data: ${error}`));
};

export const storeUserData = data => {
  AsyncStorage.setItem(USER_ASYNC_STORAGE_KEY, data)
  .catch(error => console.log(`AsyncStorage - Store user data: ${error}`));
};

export const clearLocalUserData = () => {
  AsyncStorage.clear()
  .catch(error => console.log(`AsyncStorage - Clear userdata: ${error}`));
}

export const fetchTaskList = () => {
  return AsyncStorage.getItem(TASKS_ASYNC_STORAGE_KEY)
  .then(response => (response !== null) ? JSON.parse(response) : null)
  .then(data => (data !== null) ? 
    data.map(item => ({
      ...item,
      dueTime: new Date(item.dueTime),
    })) : [])
  .catch(error => console.log(`AsyncStorage - Fetch tasklist: ${error}`));
};

export const storeTaskList = taskList => {
  AsyncStorage.setItem(TASKS_ASYNC_STORAGE_KEY, taskList)
  .catch(error => console.log(`AsyncStorage - Save tasklist: ${error}`));
};
