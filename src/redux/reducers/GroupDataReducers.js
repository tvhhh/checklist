import { 
  GET_GROUP_DATA, 
  ADD_GROUP, 
  LEAVE_GROUP, 
  ADD_USER_TO_GROUP, 
  REMOVE_USER_FROM_GROUP, 
  CHANGE_USER_POLICY, 
  DELETE_GROUP ,
  ADD_GROUP_TASK,
  EDIT_GROUP_TASK,
  REMOVE_GROUP_TASK,
  TOGGLE_GROUP_DONE,
  TOGGLE_GROUP_PINNED,
} from '../actions/GroupDataActions';
import { storeLocalGroupData, updateGroupData, deleteGroup, getDataByUsername, updateUserData } from '../../api';
import { POLICIES } from '../../utils/GroupEnum';

const initialState = [];

export default function groupDataReducers(state = initialState, action) {
  const payload = action.payload;
  var newGroupList = [];
  var newTaskList = [];
  
  switch (action.type) {
    case GET_GROUP_DATA:
      newGroupList = [ ...payload.data ];
      storeLocalGroupData(JSON.stringify(newGroupList));
      return newGroupList;

    case ADD_GROUP:
      newGroupList = [ ...state, payload.data ];
      storeLocalGroupData(JSON.stringify(newGroupList));
      return newGroupList;

    case LEAVE_GROUP:
      newGroupList = state.filter(group => {
        if (group.gid === payload.gid) {
          group.admins = group.admins.filter(username => username !== payload.username);
          group.members = group.members.filter(username => username !== payload.username);
          updateGroupData(group.gid, JSON.stringify(group.admins), 'admins');
          updateGroupData(group.gid, JSON.stringify(group.members), 'members');
          return false;
        }
        return true;    
      });
      storeLocalGroupData(JSON.stringify(newGroupList));
      return newGroupList;

    case DELETE_GROUP:
      newGroupList = state.filter(group => {
        if (group.gid === payload.gid) {
          
          deleteGroup(payload.gid);
          return false;
        }
        return true;    
      });
      storeLocalGroupData(JSON.stringify(newGroupList));
      return newGroupList;

    case REMOVE_USER_FROM_GROUP:
      newGroupList = state.map(group => {
        if (group.gid === payload.gid) {
          let newMembers = group.members.filter(username => username !== payload.username);
          let newAdmins = group.admins.filter(username => username !== payload.username);
          updateGroupData(payload.gid, JSON.stringify(newMembers), 'members');
          updateGroupData(payload.gid, JSON.stringify(newAdmins), 'admins');
          return {...group, members: newMembers, admins: newAdmins};
        }
        return group;
      });
      storeLocalGroupData(JSON.stringify(newGroupList));  
      return newGroupList;
      

    case ADD_USER_TO_GROUP:
      // console.log("in addUserToGroup, reducers");
      newGroupList = state.map(group => {
        if (group.gid === payload.gid && !group.members.includes(payload.username) && !group.admins.includes(payload.username)) {
          group.members = [...group.members, payload.username];
          updateGroupData(payload.gid, JSON.stringify(group.members), 'members');
        }
        return group;
      });
      // console.log(newGroupList);
      storeLocalGroupData(JSON.stringify(newGroupList));
      
      return newGroupList;

    case CHANGE_USER_POLICY:
      newGroupList = state.map(group => {
        if (group.gid === payload.gid) {
          let newAdmins = [];
          let newMembers = [];
          switch(payload.policy) {
            case POLICIES.ADMIN:
              newAdmins = group.admins.filter(username => username !== payload.username);
              newMembers = group.members.filter(username => username !== payload.username);
              newAdmins = [...newAdmins, payload.username];
              updateGroupData(group.gid, JSON.stringify(newAdmins), 'admins');
              updateGroupData(group.gid, JSON.stringify(newMembers), 'members');
              break;
            case POLICIES.MEMBER:
              newAdmins = group.admins.filter(username => username !== payload.username);
              newMembers = group.members.filter(username => username !== payload.username);
              newMembers = [...group.members, payload.username];
              updateGroupData(group.gid, JSON.stringify(newAdmins), 'admins');
              updateGroupData(group.gid, JSON.stringify(newMembers), 'members');
              break;
            default:
              console.debug(`unknown policy: ${payload.policy}`);
              break;
          } 
          return {...group, admins: newAdmins, members: newMembers};
        }
        return group;
      });
      storeLocalGroupData(JSON.stringify(newGroupList));
      return newGroupList;
    
    case ADD_GROUP_TASK:
      newGroupList = state.map(group => {
        if (group.gid === payload.gid) {
          
          newTaskList = [
            { id: (group.tasks.length == 0) ? 0 : group.tasks[0].id + 1, ...payload.task },
            ...group.tasks,
          ];
          newData = { ...group, tasks: newTaskList };
          updateGroupData(group.gid, JSON.stringify(newTaskList), 'tasks');
          return newData;
        }
        return group;
      });
      storeLocalGroupData(JSON.stringify(newGroupList));
      return newGroupList;

    case EDIT_GROUP_TASK:
      newGroupList = state.map(group => {
        if (group.gid === payload.gid) {
          newTaskList = group.tasks.map(task => 
            (task.id === payload.selected.id) ? 
            { id: payload.selected.id, ...payload.task } : task
          );
          newData = { ...group, tasks: newTaskList };
          updateGroupData(group.gid, JSON.stringify(newTaskList), 'tasks');
          return newData;
        }
        return group;
      });
      storeLocalGroupData(JSON.stringify(newGroupList));
      return newGroupList;
    case REMOVE_GROUP_TASK:
      newGroupList = state.map(group => {
        if (group.gid === payload.gid) {
          newTaskList = group.tasks.filter(task => task.id !== payload.selected.id);
          newData = { ...group, tasks: newTaskList };
          updateGroupData(group.gid, JSON.stringify(newTaskList), 'tasks');
          return newData;
        }
        return group;
      });
      storeLocalGroupData(JSON.stringify(newGroupList));
      return newGroupList;

    case TOGGLE_GROUP_PINNED:
      newGroupList = state.map(group => {
        if (group.gid === payload.gid) {
          newTaskList = group.tasks.map(task => 
            (task.id === payload.selected.id) ? 
            { ...task, pinned: !task.pinned } : task
          );

          newData = { ...group, tasks: newTaskList };
          updateGroupData(group.gid, JSON.stringify(newTaskList), 'tasks');
          return newData;
        }
        return group;
      });
      storeLocalGroupData(JSON.stringify(newGroupList));
      return newGroupList;
    case TOGGLE_GROUP_DONE:
       newGroupList = state.map(group => {
        if (group.gid === payload.gid) {
          newTaskList = group.tasks.map(task => 
            (task.id === payload.selected.id) ? 
            { ...task, done: !task.done } : task
          );
          newData = { ...group, tasks: newTaskList };
          updateGroupData(group.gid, JSON.stringify(newTaskList), 'tasks');
          return newData;
        }
        return group;
      });
      storeLocalGroupData(JSON.stringify(newGroupList));
      return newGroupList;

    default:
      return state;
  }
};
