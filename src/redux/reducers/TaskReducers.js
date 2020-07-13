import { GET_TASKS, CREATE_TASK, EDIT_TASK, REMOVE_TASK } from '../actions/TaskActions';
import { storeTaskList } from '../../api/api';


const initialState = [];

export default function taskReducers(state = initialState, action) {
  const payload = action.payload;
  let newData = [];
  
  switch(action.type) {
    case GET_TASKS:
      return [...payload.data];
    case CREATE_TASK:
      newData = [
        { id: (state.length == 0) ? 0 : state[0].id + 1, ...payload.task },
        ...state,
      ];
      storeTaskList(newData).catch(error => console.log(`Store error: ${error}`));
      return newData;
    case EDIT_TASK:
      newData = state.map(task => (
        task.id === payload.selected.id) ? 
        { id: payload.selected.id, ...payload.task } : task
      );
      storeTaskList(newData).catch(error => console.log(`Store error: ${error}`));
      return newData;
    case REMOVE_TASK:
      newData = state.filter(task => task.id !== payload.selected.id);
      storeTaskList(newData).catch(error => console.log(`Store error: ${error}`));
      return newData;
    default:
      return state;
  }
}
