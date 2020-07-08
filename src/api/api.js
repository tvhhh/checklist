import AsyncStorage from '@react-native-community/async-storage';

const TASKS_STORAGE_KEY = '@TodoApp:TaskDB';

export const getTaskList = async () => {
  return AsyncStorage.getItem(TASKS_STORAGE_KEY)
  .then(response => (response !== null) ? JSON.parse(response) : null)
  .then(data => (data !== null) ? 
    data.map(item => ({
      ...item,
      id: parseInt(item.id),
      dueTime: new Date(item.dueTime),
      pinned: item.pinned == 'true',
      done: item.done == 'true',
    })) : [])
  .catch(error => console.log(error));
};

export const updateTaskDB = async (value) => {
  return await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(value));
};
