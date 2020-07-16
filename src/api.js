import firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';


const firebaseConfig = {
  apiKey: "<FIREBASE-CONFIG> (ask me if you want)",
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
      id: parseInt(item.id),
      dueTime: new Date(item.dueTime),
      pinned: item.pinned == 'true',
      done: item.done == 'true',
    })),
    groups: JSON.parse(data.groups),
  }))
  .catch(error => console.log(`Firebase - Fetch user data: ${error}`));
};

export const updateUserData = (username, key, value) => {
  var ref = firebase.database().ref(`users/${username}/${key}`);
  ref.set(value);
};

export const fetchUsername = () => {
  return AsyncStorage.getItem(USER_ASYNC_STORAGE_KEY)
  .catch(error => console.log(`AsyncStorage - Fetch username: ${error}`));
};

export const storeUsername = username => {
  AsyncStorage.setItem(USER_ASYNC_STORAGE_KEY, username)
  .catch(error => console.log(`AsyncStorage - Store username: ${error}`));
};

export const clearUsername = () => {
  AsyncStorage.clear()
  .catch(error => console.log(`AsyncStorage - Clear userdata: ${error}`));
}

export const fetchTaskList = () => {
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

export const storeTaskList = taskList => {
  AsyncStorage.setItem(TASKS_ASYNC_STORAGE_KEY, taskList)
  .catch(error => console.log(`AsyncStorage - Save tasklist: ${error}`));
};
