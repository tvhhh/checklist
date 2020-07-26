import { addGroupId } from './UserDataActions';
import { createGroup, fetchLocalGroupData, getDataByUsername, updateUserData }  from '../../api';

export const GET_GROUP_DATA = "GET_GROUP_DATA"
export const ADD_GROUP = "ADD_GROUP"
export const LEAVE_GROUP = "LEAVE_GROUP"
export const DELETE_GROUP = "DELETE_GROUP"
export const ADD_USER_TO_GROUP = "ADD_USER_TO_GROUP"
export const REMOVE_USER_FROM_GROUP = "REMOVE_USER_FROM_GROUP"
export const CHANGE_USER_POLICY = "CHANGE_USER_POLICY"
export const ADD_GROUP_TASK = "ADD_GROUP_TASK"
export const EDIT_GROUP_TASK = "EDIT_GROUP_TASK"
export const REMOVE_GROUP_TASK = "REMOVE_GROUP_TASK"
export const TOGGLE_GROUP_PINNED = "TOGGLE_GROUP_PINNED"
export const TOGGLE_GROUP_DONE = "TOGGLE_GROUP_DONE"

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

export const leaveGroup = (username, gid) => ({
  type: LEAVE_GROUP,
  payload: {
    username, gid,
  }
})

export const deleteGroup = (gid) => ({
  type: DELETE_GROUP,
  payload: {
    gid,
  }
})

export const addUserToGroup = (username, gid) => ({
  type: ADD_USER_TO_GROUP,
  payload: {
    username, gid,
  }
});

export const removeUserFromGroup = (username, gid) => ({
  type: REMOVE_USER_FROM_GROUP,
  payload: {
    username, gid,
  }
});

export const changeUserPolicy = (username, gid, policy) => ({
  type: CHANGE_USER_POLICY,
  payload: {
    username, gid, policy,
  }
});

export const addGroupTask = (gid, task) => ({
  type: ADD_GROUP_TASK,
  payload: {
    gid, task,
  }
});

export const editGroupTask = (gid, task, selected) => ({
  type: EDIT_GROUP_TASK,
  payload: {
    gid,
    selected,
    task,
  },
});

export const removeGroupTask = (gid, selected) => ({
  type: REMOVE_GROUP_TASK,
  payload: {
    gid,
    selected,
  },
});

export const toggleGroupPinned = (gid, selected) => ({
  type: TOGGLE_GROUP_PINNED,
  payload: {
    gid,
    selected,
  },
});

export const toggleGroupDone = (gid, selected) => ({
  type: TOGGLE_GROUP_DONE,
  payload: {
    gid,
    selected,
  },
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

export const addUserToGroupAsync = (username, gid) => async(dispatch) => {
  try {
    let userData = await getDataByUsername(username);
    let newUserGroups = userData.groups.includes(gid)? userData.groups: [...userData.groups, gid];
    updateUserData(userData.uid, JSON.stringify(newUserGroups), 'groups');
    dispatch(addUserToGroup(username, gid));
  } catch(error) {
    console.log(`add user to group - ${error}`);
  }
}
