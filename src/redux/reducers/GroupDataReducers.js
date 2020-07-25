import { GET_GROUP_DATA, ADD_GROUP, LEAVE_GROUP, ADD_USER_TO_GROUP, REMOVE_USER_FROM_GROUP, CHANGE_USER_POLICY } from '../actions/GroupDataActions';
import { storeLocalGroupData } from '../../api';


const initialState = [];

export default function groupDataReducers(state = initialState, action) {
  const payload = action.payload;
  var newGroupList = [];
  
  switch (action.type) {
    case GET_GROUP_DATA:
      return [ ...payload.data ];

    case ADD_GROUP:
      newGroupList = [ ...state, payload.data ];
      storeLocalGroupData(JSON.stringify(newGroupList));
      return newGroupList;

    case REMOVE_USER_FROM_GROUP:

    
    default:
      return state;
  }
};
