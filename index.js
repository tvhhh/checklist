/**
 * @format
 */

import React, { useEffect } from 'react';
import { AppRegistry } from 'react-native';

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './App';
import { name as appName } from './app.json';

import SplashScreen from 'react-native-splash-screen';

import reducer from './src/redux/reducers/RootReducer';


const store = createStore(reducer, applyMiddleware(thunk));

const ReduxApp = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

console.log(store.getState());

AppRegistry.registerComponent(appName, () => ReduxApp);
