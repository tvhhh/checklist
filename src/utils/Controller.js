import AsyncStorage from '@react-native-community/async-storage';

export default class Controller {
  static _fetchData = async (key) => {
    const response = await AsyncStorage.getItem(key);
    return (response !== null) ? JSON.parse(response) : null;
  }
  
  static _storeData = async (key, value) => {
    return await AsyncStorage.setItem(key, value);
  }
};
