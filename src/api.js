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
const GROUP_ASYNC_STORAGE_KEY = '@TodoApp:GroupDB';
const CUSTOM_ASYNC_STORAGE_KEY = '@TodoApp:CustomDB';

export const initializeApp = () => {
  firebase.initializeApp(firebaseConfig);
};

export const createUser = data => {
  var { username, email, password } = data;
  return firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(res => {
    var uid = res.user.uid;
    var ref = firebase.database().ref(`users/${uid}`);
    ref.set({ avatar: "#696969", username: username, email: email, tasks: "[]", groups: "[]" });
  });
};

export const signIn = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const signOut = () => {
  firebase.auth().signOut();
};

export const reauthenticate = password => {
  var user = firebase.auth().currentUser;
  var credential = firebase.auth.EmailAuthProvider.credential(user.email, password);
  return user.reauthenticateWithCredential(credential);
};

export const updatePassword = password => {
  return firebase.auth().currentUser.updatePassword(password);
};

export const sendPasswordResetEmail = email => {
  return firebase.auth().sendPasswordResetEmail(email);
};

export const deleteUser = () => {
  var user = firebase.auth().currentUser;
  firebase.database().ref(`users/${user.uid}`).remove();
  user.delete();
};

export const fetchUserData = uid => {
  var ref = firebase.database().ref(`users/${uid}`);
  return ref.once('value')
  .then(snapshot => snapshot.val())
  .then(data => ({
    ...data,
    tasks: JSON.parse(data.tasks).map(item => ({
      ...item,
      dueTime: new Date(item.dueTime),
    })),
    groups: JSON.parse(data.groups),
    uid: uid,
  }))
  .catch(error => console.log(`Firebase - Fetch user data - ${error}`));
};

export const updateUserData = (uid, value, key) => {
  var ref = firebase.database().ref(`users/${uid}`);
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
    } : {
      uid: "Guest",
      tasks: [],
    })
  .catch(error => console.log(`AsyncStorage - Fetch data - ${error}`));
};

export const storeLocalUserData = data => {
  AsyncStorage.setItem(USER_ASYNC_STORAGE_KEY, data)
  .catch(error => console.log(`AsyncStorage - Store data - ${error}`));
};

export const clearLocalUserData = () => {
  AsyncStorage.removeItem(GROUP_ASYNC_STORAGE_KEY)
  .catch(error => console.log(`AsyncStorage - Clear group data - ${error}`));

  AsyncStorage.removeItem(USER_ASYNC_STORAGE_KEY)
  .catch(error => console.log(`AsyncStorage - Clear data - ${error}`));
};

/* api for groups */
export const fetchGroupData = (uid) => {
  var ref = firebase.database().ref(`users/${uid}`);
  return ref.once('value')
  .then(snapshot => snapshot.val())
  .then(data => JSON.parse(data.groups))
  .then(groupList => {
    var ref2 = firebase.database().ref(`groups`);
    return groupList.map(group => {
      ref2.child(group).once('value')
      .then(snapshot => snapshot.val())
      .then(data => (
        {
          ...data, 
          admins: JSON.parse(data.admins), 
          members: JSON.parse(data.memebers),
          tasks: JSON.parse(data.tasks).map(item => ({
            ...item,
            dueTime: new Date(item.dueTime),
          })),
          gid: group,
        }))
      .catch(error => console.log(`Firebase - fetch group data - ${error}`));
    })
  })
  .catch(error => console.log(`Firebase - Fetch user data - ${error}`));
}

export const fetchLocalGroupData = () => {
  return AsyncStorage.getItem(GROUP_ASYNC_STORAGE_KEY)
  .then(response => (response !== null) ? JSON.parse(response) : null)
  .then(data => (data !== null) ?
    data.map(group => (
      {
        ...group,
        tasks: group.tasks.map(item => ({
          ...item,
          dueTime: new Date(item.dueTime),
        })),
      })
    ) : []
  )
  .catch(error => console.log(`AsyncStorage - Fetch group data local - ${error}`));
};


export const storeLocalGroupData = (data) => {
  AsyncStorage.setItem(GROUP_ASYNC_STORAGE_KEY, data)
  .catch(error => console.log(`AsyncStorage - Store group data - ${error}`));
}

export const updateGroupData = (gid, value, key) => {
  var ref = firebase.database().ref(`groups/${gid}`);
  if (key) {
    ref.child(key).set(value);
  } else {
    var data = {
      ...value,
      admins: JSON.stringify(value.admins),
      members: JSON.stringify(value.members),
      tasks: JSON.stringify(value.tasks),
    };
    ref.set(data);
  }
};

/* END api for groups */

export const fetchCustomization = () => {
  return AsyncStorage.getItem(CUSTOM_ASYNC_STORAGE_KEY)
  .catch(error => console.log(`AsyncStorage - Fetch customization - ${error}`));
};

export const storeCustomization = customize => {
  return AsyncStorage.setItem(CUSTOM_ASYNC_STORAGE_KEY, customize)
  .catch(error => console.log(`AsyncStorage - Save customization - ${error}`));
};
