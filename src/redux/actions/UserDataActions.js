import { fetchTaskList, fetchUsername, fetchUserData } from '../../api';


export const GET_DATA = "GET_DATA";
export const CREATE_TASK = "CREATE_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
export const EDIT_PINNED = "EDIT_PINNED";

export const getData = data => ({
  type: GET_DATA,
  payload: {
    data,
  },
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

export const editPinned = selected => ({
  type: EDIT_PINNED,
  payload: {
    selected,
  },
});

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
