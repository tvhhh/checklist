import { combineReducers } from 'redux';
import todoReducer from './TodoReducers';
import dataReducer from './DataReducers';


const reducer = combineReducers({
  data: dataReducer,
  todos: todoReducer,
});

export default reducer;
