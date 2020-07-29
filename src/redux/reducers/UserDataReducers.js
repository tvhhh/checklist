import { 
  GET_DATA,
  CLEAR_DATA,
  SET_CONNECTION,
  CREATE_TASK,
  EDIT_TASK,
  TOGGLE_PINNED,
  TOGGLE_DONE,
  REMOVE_TASK,
  SET_AVATAR,
  SET_NAME,
  SET_PHONE,
  ADD_GROUP_ID,
  REMOVE_GROUP_ID,
} from '../actions/UserDataActions';

import { storeLocalUserData, updateUserData } from '../../api';
import { scheduleNotification, deleteNotification } from '../../utils/Notification';


const initialState = {
  connected: false,
  loggedIn: false,
  data: {
    uid: "Guest",
    tasks: [],
  },
};

export default function userDataReducers(state = initialState, action) {
  const payload = action.payload;
  var currentTaskList = state.data.tasks;
  var newTaskList = [];
  var currentGroupList = state.data.groups;
  var newGroupList = [];
  var newData = {};
  
  switch(action.type) {
    case GET_DATA:
      return {
        ...state,
        loggedIn: payload.data.uid !== "Guest",
        data: { ...payload.data },
      };
    case CLEAR_DATA:
      return {
        ...initialState,
        connected: state.connected,
      };
    case SET_CONNECTION:
      return {
        ...state,
        connected: payload.status,
      };
    case CREATE_TASK:
      newTaskList = [
        { id: (currentTaskList.length == 0) ? 0 : currentTaskList[0].id + 1, ...payload.task },
        ...currentTaskList,
      ];
      newData = { ...state.data, tasks: newTaskList };
      var time = new Date(payload.task.dueTime);
      time.setMinutes(time.getMinutes() - 30);
      scheduleNotification(
        payload.task.title,
        payload.task.id,
        'Your task will end in a few minutes.',
        time,
      );
      scheduleNotification(
        payload.task.title,
        payload.task.id,
        'Your task has expired.',
        payload.task.dueTime,
      );
      if (state.loggedIn) updateUserData(state.data.uid, JSON.stringify(newTaskList), 'tasks');
      storeLocalUserData(JSON.stringify(newData));
      return { ...state, data: newData };
    case EDIT_TASK:
      newTaskList = currentTaskList.map(task => 
        (task.id === payload.selected.id) ? 
        { id: payload.selected.id, ...payload.task } : task
      );
      newData = { ...state.data, tasks: newTaskList };
      deleteNotification(payload.selected.id);
      var time = new Date(payload.task.dueTime);
      time.setMinutes(time.getMinutes() - 30);
      scheduleNotification(
        payload.task.title,
        payload.task.id,
        'Your task will end in a few minutes.',
        time,
      );
      scheduleNotification(
        payload.task.title,
        payload.task.id,
        'Your task has expired.',
        payload.task.dueTime,
      );
      if (state.loggedIn) updateUserData(state.data.uid, JSON.stringify(newTaskList), 'tasks');
      storeLocalUserData(JSON.stringify(newData));
      return { ...state, data: newData };
    case REMOVE_TASK:
      newTaskList = currentTaskList.filter(task => task.id !== payload.selected.id);
      newData = { ...state.data, tasks: newTaskList };
      deleteNotification(payload.selected.id);
      if (state.loggedIn) updateUserData(state.data.uid, JSON.stringify(newTaskList), 'tasks');
      storeLocalUserData(JSON.stringify(newData));
      return { ...state, data: newData };
    case TOGGLE_PINNED:
      newTaskList = currentTaskList.map(task => 
        (task.id === payload.selected.id) ? 
        { ...task, pinned: !task.pinned } : task
      );
      newData = { ...state.data, tasks: newTaskList };
      if (state.loggedIn) updateUserData(state.data.uid, JSON.stringify(newTaskList), 'tasks');
      storeLocalUserData(JSON.stringify(newData));
      return { ...state, data: newData };
    case TOGGLE_DONE:
      newTaskList = currentTaskList.map(task => 
        (task.id === payload.selected.id) ? 
        { ...task, done: !task.done } : task
      );
      newData = { ...state.data, tasks: newTaskList };
      if (!payload.selected.done) deleteNotification(payload.selected.id);
      else {
        var time = new Date(payload.selected.dueTime);
        time.setMinutes(time.getMinutes() - 30);
        scheduleNotification(
          payload.selected.title,
          payload.selected.id,
          'Your task will end in a few minutes.',
          time,
        );
        scheduleNotification(
          payload.selected.title,
          payload.selected.id,
          'Your task has expired.',
          payload.selected.dueTime,
        );
      }
      if (state.loggedIn) updateUserData(state.data.uid, JSON.stringify(newTaskList), 'tasks');
      storeLocalUserData(JSON.stringify(newData));
      return { ...state, data: newData };
    case SET_AVATAR:
      newData = { ...state.data, avatar: payload.color };
      updateUserData(state.data.uid, payload.color, 'avatar');
      storeLocalUserData(JSON.stringify(newData));
      return { ...state, data: newData };
    case SET_NAME:
      newData = { ...state.data, name: payload.name };
      updateUserData(state.data.uid, payload.name, 'name');
      storeLocalUserData(JSON.stringify(newData));
      return { ...state, data: newData };
    case SET_PHONE:
      newData = { ...state.data, phone: payload.phone };
      updateUserData(state.data.uid, payload.phone, 'phone');
      storeLocalUserData(JSON.stringify(newData));
      return { ...state, data: newData };
    case ADD_GROUP_ID:
      newGroupList = [ ...currentGroupList, payload.gid ];
      console.log(newGroupList);
      newData = { ...state.data, groups: newGroupList };
      console.log(newData);
      updateUserData(state.data.uid, JSON.stringify(newGroupList), 'groups');
      storeLocalUserData(JSON.stringify(newData));
      return { ...state, data: newData };
    case REMOVE_GROUP_ID:
      newGroupList = currentGroupList.filter(gid => {
        return gid !== payload.gid
      });
      newData = { ...state.data, groups: newGroupList };
      updateUserData(state.data.uid, JSON.stringify(newGroupList), 'groups');
      storeLocalUserData(JSON.stringify(newData));
      return {... state, data:newData};
    default:
      return state;
  }
};
