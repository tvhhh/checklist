/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import TodoApp from './src/index';

import reducer from './src/redux/reducers/RootReducer';
import { fetchData } from './src/utils/Controller';

import SplashScreen from 'react-native-splash-screen';


const STORAGE_KEY = "@TodoApp:TaskDB";

// const todosList = fetchData(STORAGE_KEY)
// .then(data => {
//   if (data !== null) {
//     console.log("This shit first");
//     return data.map(item => ({
//       ...item,
//       id: parseInt(item.id),
//       dueTime: new Date(item.dueTime),
//       pinned: item.pinned == 'true',
//       done: item.done == 'true',
//     }));
//   }
// }).catch(error => console.log(error));

// console.log("This should be later");

const initialState = {  };
const store = createStore(reducer, initialState);

console.log(store.getState());

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
};

export default App;
