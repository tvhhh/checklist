import { combineReducers } from 'redux';
import userDataReducers from './UserDataReducers';


const reducer = combineReducers({
  userData: userDataReducers,
});

export default reducer;
