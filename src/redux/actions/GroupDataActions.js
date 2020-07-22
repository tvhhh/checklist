export const CREATE_GROUP = "CREATE_GROUP"
export const LEAVE_GROUP = "LEAVE_GROUP"
export const ADD_USER_TO_GROUP = "ADD_USER_TO_GROUP"
export const REMOVE_USER_FROM_GROUP = "REMOVE_USER_FROM_GROUP"
export const CHANGE_USER_POLICY = "CHANGE_USER_POLICY"
export const ADD_GROUP_TASK = "ADD_GROUP_TASK"
export const EDIT_GROUP_TASK = "EDIT_GROUP_TASK"
export const REMOVE_GROUP_TASK = "REMOVE_GROUP_TASK"

export const createGroup = data => ({
  type: CREATE_GROUP,
  payload: {
    data,
  }
})

export const leaveGroup = (uid, gid) => ({
  type: LEAVE_GROUP,
  payload: {
    uid, gid,
  }
})

export const addUserToGroup = (uid, gid) => ({
  type: ADD_USER_TO_GROUP,
  payload: {
    uid, gid,
  }
})

export const removeUserFromGroup = (uid, gid) => ({
  type: REMOVE_USER_FROM_GROUP,
  payload: {
    uid, gid,
  }
})

export const changeUserPolicy = (uid, gid, policy) => ({
  type: CHANGE_USER_POLICY,
  payload: {
    uid, gid, policy,
  }
})