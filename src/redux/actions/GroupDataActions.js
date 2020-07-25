import { addGroupId } from './UserDataActions';
import { createGroup }  from '../../api';


export const ADD_GROUP = "ADD_GROUP"
export const ADD_USER_TO_GROUP = "ADD_USER_TO_GROUP"
export const REMOVE_USER_FROM_GROUP = "REMOVE_USER_FROM_GROUP"
export const CHANGE_USER_POLICY = "CHANGE_USER_POLICY"
export const ADD_GROUP_TASK = "ADD_GROUP_TASK"
export const EDIT_GROUP_TASK = "EDIT_GROUP_TASK"
export const REMOVE_GROUP_TASK = "REMOVE_GROUP_TASK"

export const addGroup = data => ({
  type: ADD_GROUP,
  payload: {
    data,
  }
});

export const addUserToGroup = (uid, gid) => ({
  type: ADD_USER_TO_GROUP,
  payload: {
    uid, gid,
  }
});

export const removeUserFromGroup = (uid, gid) => ({
  type: REMOVE_USER_FROM_GROUP,
  payload: {
    uid, gid,
  }
});

export const changeUserPolicy = (uid, gid, policy) => ({
  type: CHANGE_USER_POLICY,
  payload: {
    uid, gid, policy,
  }
});

export const registerGroup = (username, name) => async (dispatch) => {
  try {
    const { gid, data } = await createGroup(username, name);
    const groupData = {
      ...data,
      gid: gid,
    };
    dispatch(addGroup(groupData));
    dispatch(addGroupId(gid));
  } catch(error) {
    console.log(`Create group - ${error}`);
  }
};
