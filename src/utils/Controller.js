import AsyncStorage from '@react-native-community/async-storage';


const fetchData = async (key) => {
  const response = await AsyncStorage.getItem(key);
  return (response !== null) ? JSON.parse(response) : null;
}

const storeData = async (key, value) => {
  return await AsyncStorage.setItem(key, value);
}

export { fetchData, storeData };
