import firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';


const firebaseConfig = {
  apiKey: "<API-KEY>",
  authDomain: "<AUTH-DOMAIN>",
  databaseURL: "<DATABASE-URL>",
  projectId: "<PROJECT-ID>",
  storageBucket: "<STORAGE-BUCKET>",
  messagingSenderId: "<SENDER-ID>",
  appId: "<APP-ID>",
  measurementId: "<MEASUREMENT-ID>",
};

const USER_ASYNC_STORAGE_KEY = '@TodoApp:UserDB';
const TASKS_ASYNC_STORAGE_KEY = '@TodoApp:TaskDB';

export const initializeApp = () => {
  firebase.initializeApp(firebaseConfig);
};

export const createUser = async (data) => {
  var ref = firebase.database().ref(`users/${data.username}`);
  return ref.set({ ...data, tasks: "[]", groups: "[]" });
};

export const isUsernameExisting = async (username) => {
  var ref = firebase.database().ref(`users/${username}`);
  return ref.once('value')
  .then(snapshot => snapshot.exists());
};

export const isEmailExisting = async (email) => {
  var ref = firebase.database().ref('users');
  return ref.orderByChild('email').equalTo(email).once('value')
  .then(snapshot => snapshot.exists());
};

export const authorize = async (username, password) => {
  var ref = firebase.database().ref(`users/${username}`);
  return ref.once('value')
  .then(snapshot => snapshot.exists() && snapshot.child('password').val() === password)
  .catch(error => console.log(`Firebase - Authorize: ${error}`));
};

export const fetchUserData = async (username) => {
  var ref = firebase.database().ref(`users/${username}`);
  return ref.once('value')
  .then(snapshot => snapshot.val())
  .then(data => ({
    ...data,
    tasks: JSON.parse(data.tasks).map(item => ({
      ...item,
      id: parseInt(item.id),
      dueTime: new Date(item.dueTime),
      pinned: item.pinned == 'true',
      done: item.done == 'true',
    })),
  }))
  .catch(error => console.log(`Firebase - Fetch user data: ${error}`));
};

export const updateUserData = async (username, key, value) => {
  var ref = firebase.database().ref(`users/${username}/${key}`);
  return ref.set(value);
};

export const fetchUsername = async () => {
  return AsyncStorage.getItem(USER_ASYNC_STORAGE_KEY)
  .catch(error => console.log(`AsyncStorage - Fetch username: ${error}`));
};

export const storeUsername = async (username) => {
  return await AsyncStorage.setItem(USER_ASYNC_STORAGE_KEY, username)
  .catch(error => console.log(`AsyncStorage - Store username: ${error}`));
};

export const clearUserData = async () => {
  return await AsyncStorage.clear()
  .catch(error => console.log(`AsyncStorage - Clear userdata: ${error}`));
}

export const fetchTaskList = async () => {
  return AsyncStorage.getItem(TASKS_ASYNC_STORAGE_KEY)
  .then(response => (response !== null) ? JSON.parse(response) : null)
  .then(data => (data !== null) ? 
    data.map(item => ({
      ...item,
      id: parseInt(item.id),
      dueTime: new Date(item.dueTime),
      pinned: item.pinned == 'true',
      done: item.done == 'true',
    })) : [])
  .catch(error => console.log(`AsyncStorage - Fetch tasklist: ${error}`));
};

export const storeTaskList = async (taskList) => {
  return await AsyncStorage.setItem(TASKS_ASYNC_STORAGE_KEY, taskList)
  .catch(error => console.log(`AsyncStorage - Save tasklist: ${error}`));
};
