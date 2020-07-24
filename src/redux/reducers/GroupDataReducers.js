import {CREATE_GROUP, LEAVE_GROUP, ADD_USER_TO_GROUP, REMOVE_USER_FROM_GROUP, CHANGE_USER_POLICY} from '../actions/GroupDataActions'
import { TEST_DATA } from '../../utils/GroupEnum'

const initialState = {
  currentUid: "0",
  users: TEST_DATA.users,
  groups: TEST_DATA.groups,

  groupsOfThisUser: [],
}

export default function groupDataReducers(state=initialState, action) {
  switch (action.type) {
    case CREATE_GROUP:

      findUidFromUsername = (username) => {
        for (let uid in state.users) {
          let user = state.users[uid];
          if (user.username === username) {
            return user.uid;
          }
        }
        return "-1";
      }

      let data = payload.data;
      let newGroup = {
        gid: data.gid,
        name: data.name,
        owner: state.currentUid,
        admins: [state.currentUid],
        members: [data.members.forEach(item => findUidFromUsername(item.text)).filter(item => item !== "-1")],
        tasks: [],
      }
      
      let users = { ...state.users }
      let groups = { ...state.groups }

      for (let uid of groupData.admins) {
        users[uid].groups.push(groupData.gid) 
      }
      for (let uid of groupData.members) {
        users[uid].groups.push(groupData.gid) 
      }
      groups[groupData.gid] = newGroup
      return {...state, users: users, groups: groups}

    // case LEAVE_GROUP:
    //   let uid = payload.uid;
    //   let gid = payload.gid;
    //   let users = { ...state.users }
    //   let DBGroups = { ...state.groups }

    //   DBGroups[gid].admins = DBGroups[gid].admins.filter(id => id !== uid)
    //   DBGroups[gid].members = DBGroups[gid].members.filter(id => id !== uid)
    //   return {...state, users: DBUsers, groups: DBGroups}

    case REMOVE_USER_FROM_GROUP:
      /*
      remove uid khoi groups[gid].admins
      remove uid khoi groups[gid].members
      remove gid khoi users[uid].groups
      */

    
    default:
      return state;
  }
}