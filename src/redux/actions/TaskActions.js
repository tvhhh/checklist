import { fetchTaskList, storeTaskList } from '../../api/api';


export const GET_TASKS = "FETCH_TASKS";
export const CREATE_TASK = "CREATE_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const REMOVE_TASK = "REMOVE_TASK";

export const getData = data => ({
  type: GET_TASKS,
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

export const fetchData = () => dispatch => {
  fetchTaskList()
  .then(data => dispatch(getData(data)))
  .catch(error => console.log(`Fetch error: ${error}`));
};
