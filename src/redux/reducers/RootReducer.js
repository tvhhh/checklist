import { combineReducers } from 'redux';
import todoReducer from './TodoReducers';

const reducer = combineReducers({
  todos: todoReducer,
});

export default reducer;
