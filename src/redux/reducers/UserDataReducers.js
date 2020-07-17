import { GET_DATA, CLEAR_DATA, CREATE_TASK, EDIT_TASK, EDIT_PINNED, REMOVE_TASK, SET_NAME, SET_PHONE, SET_PASSWORD, SET_AVATAR } from '../actions/UserDataActions';
import { storeTaskList, updateUserData } from '../../api';


const initialState = {
  loggedIn: false,
  data: {
    username: null,
    tasks: [],
  },
};

export default function userDataReducers(state = initialState, action) {
  const payload = action.payload;
  let currentTaskList = state.data.tasks;
  let newTaskList = [];
  
  switch(action.type) {
    case GET_DATA:
      return {
        loggedIn: payload.data.username !== null,
        data: { ...payload.data },
      };
    case CLEAR_DATA:
      return initialState;
    case CREATE_TASK:
      newTaskList = [
        { id: (currentTaskList.length == 0) ? 0 : currentTaskList[0].id + 1, ...payload.task },
        ...currentTaskList,
      ];
      if (state.data.username !== null) {
        updateUserData(state.data.username, 'tasks', JSON.stringify(newTaskList));
      } else {
        storeTaskList(JSON.stringify(newTaskList));
      }
      return {
        ...state,
        data: { ...state.data, tasks: newTaskList },
      };
    case EDIT_TASK:
      newTaskList = currentTaskList.map(task => (
        task.id === payload.selected.id) ? 
        { id: payload.selected.id, ...payload.task } : task
      );
      if (state.data.username !== null) {
        updateUserData(state.data.username, 'tasks', JSON.stringify(newTaskList));
      } else {
        storeTaskList(JSON.stringify(newTaskList));
      }
      return {
        ...state,
        data: { ...state.data, tasks: newTaskList },
      };
    case REMOVE_TASK:
      newTaskList = currentTaskList.filter(task => task.id !== payload.selected.id);
      if (state.data.username !== null) {
        updateUserData(state.data.username, 'tasks', JSON.stringify(newTaskList));
      } else {
        storeTaskList(JSON.stringify(newTaskList));
      }
      return {
        ...state,
        data: { ...state.data, tasks: newTaskList },
      };
    case EDIT_PINNED:
      newTaskList = currentTaskList.map(task => (task.id === payload.selected.id) ? { ...task, pinned: !task.pinned } : task);
      if (state.data.username !== null) {
        updateUserData(state.data.username, 'tasks', JSON.stringify(newTaskList));
      } else {
        storeTaskList(JSON.stringify(newTaskList));
      }
      return {
        ...state,
        data: { ...state.data, tasks: newTaskList },
      };
    case SET_AVATAR:
      updateUserData(state.data.username, 'avatar', payload.color);
      return {
        ...state,
        data: { ...state.data, avatar: payload.color },
      };
    case SET_NAME:
      updateUserData(state.data.username, 'name', payload.name);
      return {
        ...state,
        data: { ...state.data, name: payload.name },
      };
    case SET_PHONE:
      updateUserData(state.data.username, 'phone', payload.phone);
      return {
        ...state,
        data: { ...state.data, phone: payload.phone },
      };
    case SET_PASSWORD:
      updateUserData(state.data.username, 'password', payload.password);
      return {
        ...state,
        data: { ...state.data, password: payload.password },
      };
    default:
      return state;
  }
};
