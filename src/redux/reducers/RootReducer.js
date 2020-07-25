import { combineReducers } from 'redux';
import userDataReducers from './UserDataReducers';
import customizeReducer from './CustomizationReducers';
import groupDataReducers from './GroupDataReducers';

const reducer = combineReducers({
  userData: userDataReducers,
  groupData: groupDataReducers,
  customize: customizeReducer,
});

export default reducer;
