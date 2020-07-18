import { authorize, fetchTaskList, fetchLocalUserData, fetchUserData, storeUserData, clearLocalUserData, removeUser } from '../../api';


export const GET_DATA = "GET_DATA";
export const CLEAR_DATA = "CLEAR_DATA";
export const SET_CONNECTION = "SET_CONNECTION";
export const CREATE_TASK = "CREATE_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
export const EDIT_PINNED = "EDIT_PINNED";
export const SET_AVATAR = "SET_AVATAR";
export const SET_NAME = "SET_NAME";
export const SET_PHONE = "SET_PHONE";
export const SET_PASSWORD = "SET_PASSWORD";

export const getData = data => ({
  type: GET_DATA,
  payload: {
    data,
  },
});

export const clearData = () => ({
  type: CLEAR_DATA,
});

export const setConnectionStatus = status => ({
  type: SET_CONNECTION,
  payload: {
    status,
  }
})

export const createTask = task => ({
  type: CREATE_TASK,
  payload: {
    task,
  }
});

export const editTask = (task, selected) => ({
  type: EDIT_TASK,
  payload: {
    selected,
    task,
  },
});

export const removeTask = selected => ({
  type: REMOVE_TASK,
  payload: {
    selected,
  },
});

export const editPinned = selected => ({
  type: EDIT_PINNED,
  payload: {
    selected,
  },
});

export const setAvatar = color => ({
  type: SET_AVATAR,
  payload: {
    color,
  },
})

export const setName = name => ({
  type: SET_NAME,
  payload: {
    name,
  },
});

export const setPhone = phone => ({
  type: SET_PHONE,
  payload: {
    phone,
  },
});

export const setPassword = password => ({
  type: SET_PASSWORD,
  payload: {
    password,
  },
});

export const logIn = (username, password) => async (dispatch) => {
  try {
    if (await authorize(username, password)) {
      const data = await fetchUserData(username);
      storeUserData(JSON.stringify(data));
      return data;
    } else {
      return null;
    }
  } catch(error) {
    console.log(`Login error: ${error}`);
  }
};

export const logOut = () => async (dispatch) => {
  try {
    dispatch(clearData());
    clearLocalUserData();
  } catch(error) {
    console.log(`Logout error: ${error}`);
  }
};

export const fetchData = () => async (dispatch) => {
  try {
    var data = await fetchLocalUserData();
    if (data === null) {
      let taskList = await fetchTaskList();
      data = { username: null, tasks: taskList };
    }
    dispatch(getData(data));
  } catch(error) {
    console.log(`Fetch error: ${error}`);
  }
};

export const removeAccount = username => async (dispatch) => {
  try {
    dispatch(clearData());
    clearLocalUserData();
    removeUser(username);
  } catch (error) {
    console.log(`Remove account error: ${error}`);
  }
};
