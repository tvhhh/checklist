import { combineReducers } from 'redux';
import todoReducer from './TodoReducers';
import customizeReducer from './CustomizationReducers';

const reducer = combineReducers({
  todos: todoReducer,
  customize: customizeReducer,
});

export default reducer;
