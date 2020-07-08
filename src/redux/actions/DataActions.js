import { getTaskList, updateTaskDB } from '../../api/api';
import { initializeTaskList } from './TodoActions';


export const FETCH_DATA = "FETCH_DATA";

export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";

export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

export const getData = () => ({
  type: FETCH_DATA,
  payload: {},
});

export const getDataSuccess = data => ({
  type: FETCH_DATA_SUCCESS,
  payload: {
    data,
  },
});

export const getDataFailure = error => ({
  type: FETCH_DATA_FAILURE,
  payload: {
    error,
  },
});

export const fetchData = () => dispatch => {
  dispatch(getData());
  getTaskList()
  .then(data => dispatch(getDataSuccess(data)))
  .then(data => dispatch(initializeTaskList(data)))
  .catch(error => dispatch(getDataFailure(error)));
};
