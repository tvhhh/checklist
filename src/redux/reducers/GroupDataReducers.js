import { ADD_GROUP, LEAVE_GROUP, ADD_USER_TO_GROUP, REMOVE_USER_FROM_GROUP, CHANGE_USER_POLICY } from '../actions/GroupDataActions'

const initialState = [];

export default function groupDataReducers(state=initialState, action) {
  const payload = action.payload;
  
  switch (action.type) {
    case ADD_GROUP:
      return [ ...state, payload.data ];

    case REMOVE_USER_FROM_GROUP:

    
    default:
      return state;
  }
};
