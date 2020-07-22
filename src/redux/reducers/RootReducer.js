import { combineReducers } from 'redux';
import userDataReducers from './UserDataReducers';
import customizeReducer from './CustomizationReducers';
import groupDataReducers from './GroupDataReducers';

const reducer = combineReducers({
  userData: userDataReducers,
  customize: customizeReducer,
  groupData: groupDataReducers,
});

export default reducer;
