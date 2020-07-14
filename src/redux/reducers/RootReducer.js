import { combineReducers } from 'redux';
import userDataReducers from './UserDataReducers';
import customizeReducer from './CustomizationReducers';

const reducer = combineReducers({
  userData: userDataReducers,
  customize: customizeReducer,
});

export default reducer;
