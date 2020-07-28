import { 
  fetchUserData,
  fetchGroupData,
  createUser,
  isUsernameExisting,
  signIn,
  signOut,
  reauthenticate,
  updatePassword,
  sendPasswordResetEmail,
  fetchLocalUserData,
  storeLocalUserData,
  clearLocalUserData,
  storeLocalGroupData,
  deleteUser,
} from '../../api';


export const GET_DATA = "GET_DATA";
export const CLEAR_DATA = "CLEAR_DATA";
export const SET_CONNECTION = "SET_CONNECTION";
export const CREATE_TASK = "CREATE_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
export const TOGGLE_PINNED = "TOGGLE_PINNED";
export const TOGGLE_DONE = "TOGGLE_DONE";
export const SET_AVATAR = "SET_AVATAR";
export const SET_USERNAME = "SET_USERNAME";
export const SET_NAME = "SET_NAME";
export const SET_PHONE = "SET_PHONE";
export const ADD_GROUP_ID = "ADD_GROUP_ID";
export const REMOVE_GROUP_ID = "REMOVE_GROUP_ID";

export const getData = data => ({
  type: GET_DATA,
  payload: {
    data,
  },
});

export const clearData = () => ({
  type: CLEAR_DATA,
});

export const setConnectionStatus = status => ({
  type: SET_CONNECTION,
  payload: {
    status,
  }
})

export const createTask = task => ({
  type: CREATE_TASK,
  payload: {
    task,
  }
});

export const editTask = (task, selected) => ({
  type: EDIT_TASK,
  payload: {
    selected,
    task,
  },
});

export const removeTask = selected => ({
  type: REMOVE_TASK,
  payload: {
    selected,
  },
});

export const togglePinned = selected => ({
  type: TOGGLE_PINNED,
  payload: {
    selected,
  },
});

export const toggleDone = selected => ({
  type: TOGGLE_DONE,
  payload: {
    selected,
  },
});

export const setAvatar = color => ({
  type: SET_AVATAR,
  payload: {
    color,
  },
});

export const setUsername = username => ({
  type: SET_USERNAME,
  payload: {
    username,
  },
})

export const setName = name => ({
  type: SET_NAME,
  payload: {
    name,
  },
});

export const setPhone = phone => ({
  type: SET_PHONE,
  payload: {
    phone,
  },
});

export const addGroupId = gid => ({
  type: ADD_GROUP_ID,
  payload: {
    gid,
  },
});

export const removeGroupId = gid => ({
  type: REMOVE_GROUP_ID,
  payload: {
    gid,
  },
});

export const fetchData = () => async (dispatch) => {
  try {
    var data = await fetchLocalUserData();
    dispatch(getData(data));
  } catch(error) {
    console.log(`Fetch error - ${error}`);
  }
};

export const registerUser = async (data) => {
  try {
    if (await isUsernameExisting(data.username))
      throw { message: "This username has already been used." }
    await createUser(data);
    return "done";
  } catch(error) {
    return error.message;
  }
};

export const logIn = async (email, password) => {
  try {
    var res = await signIn(email, password);
    var data = await fetchUserData(res.user.uid);
    var groupData = await fetchGroupData(res.user.uid);
    storeLocalUserData(JSON.stringify(data));
    storeLocalGroupData(JSON.stringify(groupData));
    return { status: "done", data: data, groupData: groupData };
  } catch(error) {
    return { status: "failed", error: error.message };
  }
};

export const logOut = async () => {
  signOut();
  clearLocalUserData();
};

export const deactivateUser = async () => {
  deleteUser();
  clearLocalUserData();
};

export const reauthenticateUser = async (password) => {
  try {
    await reauthenticate(password);
    return "done";
  } catch(error) {
    return error.message;
  }
};

export const setPassword = async (password) => {
  try {
    await updatePassword(password);
    return "done";
  } catch(error) {
    return error.message;
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(email);
    return "done";
  } catch(error) {
    return error.message;
  }
};
