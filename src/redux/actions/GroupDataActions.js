import { addGroupId } from './UserDataActions';
import { createGroup, fetchLocalGroupData }  from '../../api';


export const GET_GROUP_DATA = "GET_GROUP_DATA"
export const ADD_GROUP = "ADD_GROUP"
export const ADD_USER_TO_GROUP = "ADD_USER_TO_GROUP"
export const REMOVE_USER_FROM_GROUP = "REMOVE_USER_FROM_GROUP"
export const CHANGE_USER_POLICY = "CHANGE_USER_POLICY"
export const ADD_GROUP_TASK = "ADD_GROUP_TASK"
export const EDIT_GROUP_TASK = "EDIT_GROUP_TASK"
export const REMOVE_GROUP_TASK = "REMOVE_GROUP_TASK"

export const getGroupData = data => ({
  type: GET_GROUP_DATA,
  payload: {
    data,
  },
})

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

export const fetchGroups = () => async (dispatch) => {
  try {
    const data = await fetchLocalGroupData();
    dispatch(getGroupData(data));
  } catch(error) {
    console.log(`Fetch group error - ${error}`);
  }
};

export const registerGroup = (username, name) => async (dispatch) => {
  try {
    const gid = await createGroup(username, name);
    const groupData = {
      name: name,
      owner: username,
      admins: [username],
      members: [],
      tasks: [],
      gid: gid,
    };
    dispatch(addGroup(groupData));
    dispatch(addGroupId(gid));
  } catch(error) {
    console.log(`Create group - ${error}`);
  }
};
