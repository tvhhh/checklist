import { GET_DATA, CLEAR_DATA, SET_CONNECTION, CREATE_TASK, EDIT_TASK, REMOVE_TASK, SET_NAME, SET_PHONE, SET_PASSWORD, SET_AVATAR } from '../actions/UserDataActions';
import { storeTaskList, storeUserData, updateUserData } from '../../api';


const initialState = {
  connection: false,
  loggedIn: false,
  data: {
    username: null,
    tasks: [],
  },
};

export default function userDataReducers(state = initialState, action) {
  const payload = action.payload;
  var currentTaskList = state.data.tasks;
  var newTaskList = [];
  var newData = {};
  
  switch(action.type) {
    case GET_DATA:
      return {
        ...state,
        loggedIn: payload.data.username !== null,
        data: { ...payload.data },
      };
    case CLEAR_DATA:
      return {
        ...initialState,
        connection: state.connection,
      };
    case SET_CONNECTION:
      return {
        ...state,
        connection: payload.status,
      };
    case CREATE_TASK:
      newTaskList = [
        { id: (currentTaskList.length == 0) ? 0 : currentTaskList[0].id + 1, ...payload.task },
        ...currentTaskList,
      ];
      newData = { ...state.data, tasks: newTaskList }
      if (state.data.username !== null) {
        updateUserData(state.data.username, JSON.stringify(newTaskList), 'tasks');
        storeUserData(JSON.stringify(newData));
      } else {
        storeTaskList(JSON.stringify(newTaskList));
      }
      return { ...state, data: newData };
    case EDIT_TASK:
      newTaskList = currentTaskList.map(task => (
        task.id === payload.selected.id) ? 
        { id: payload.selected.id, ...payload.task } : task
      );
      newData = { ...state.data, tasks: newTaskList }
      if (state.data.username !== null) {
        updateUserData(state.data.username, JSON.stringify(newTaskList), 'tasks');
        storeUserData(JSON.stringify(newData));
      } else {
        storeTaskList(JSON.stringify(newTaskList));
      }
      return { ...state, data: newData };
    case REMOVE_TASK:
      newTaskList = currentTaskList.filter(task => task.id !== payload.selected.id);
      newData = { ...state.data, tasks: newTaskList }
      if (state.data.username !== null) {
        updateUserData(state.data.username, JSON.stringify(newTaskList), 'tasks');
        storeUserData(JSON.stringify(newData));
      } else {
        storeTaskList(JSON.stringify(newTaskList));
      }
      return { ...state, data: newData };
    case SET_AVATAR:
      newData = { ...state.data, avatar: payload.color };
      updateUserData(state.data.username, payload.color, 'avatar');
      storeUserData(JSON.stringify(newData));
      return { ...state, data: newData };
    case SET_NAME:
      newData = { ...state.data, name: payload.name };
      updateUserData(state.data.username, payload.name, 'name');
      storeUserData(JSON.stringify(newData));
      return { ...state, data: newData };
    case SET_PHONE:
      newData = { ...state.data, phone: payload.phone };
      updateUserData(state.data.username, payload.phone, 'phone');
      storeUserData(JSON.stringify(newData));
      return { ...state, data: newData };
    case SET_PASSWORD:
      newData = { ...state.data, password: payload.password };
      updateUserData(state.data.username, payload.password, 'password');
      storeUserData(JSON.stringify(newData));
      return { ...state, data: newData };
    default:
      return state;
  }
};
