import { authorize, fetchTaskList, fetchUsername, fetchUserData, storeUsername, clearUsername, removeUser } from '../../api';


export const GET_DATA = "GET_DATA";
export const CLEAR_DATA = "CLEAR_DATA";
export const CREATE_TASK = "CREATE_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
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
      storeUsername(username);
      return await fetchUserData(username);
    } else {
      return null;
    }
  } catch (error) {
    console.log(`Login error: ${error}`);
  }
};

export const logOut = () => dispatch => {
  try {
    dispatch(clearData());
    clearUsername();
  } catch(error) {
    console.log(`Logout error: ${error}`);
  }
};

export const fetchData = () => async (dispatch) => {
  try {
    const username = await fetchUsername();
    if (username !== null) {
      var data = await fetchUserData(username);
    } else {
      let taskList = await fetchTaskList();
      data = { username: null, tasks: taskList };
    }
    dispatch(getData(data));
  } catch(error) {
    console.log(`Fetch error: ${error}`);
  }
};

export const removeAccount = username => dispatch => {
  try {
    dispatch(clearData());
    clearUsername();
    removeUser(username);
  } catch (error) {
    console.log(`Remove account error: ${error}`);
  }
};
