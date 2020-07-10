import { combineReducers } from 'redux';
import taskReducer from './TaskReducers';


const reducer = combineReducers({
  tasks: taskReducer,
});

export default reducer;
