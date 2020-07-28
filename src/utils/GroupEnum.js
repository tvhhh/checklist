export const POLICIES = {
  OWNER: 'owner',
  ADMIN: 'admin',
  MEMBER: 'member',
  UNKNOWN: 'unknown',
}

export const TASK_STATES = {
  DONE: 'done',
  NOT_DONE: 'not-done',
  NOT_RELATED: 'not-related',
}

export const getPolicyFromGroup = (group, username) => {
  // console.debug('in get policy');
  // console.debug(group, username);
  if (group.owner === username) return POLICIES.OWNER;
  if (group.admins.includes(username)) return POLICIES.ADMIN;
  if (group.members.includes(username)) return POLICIES.MEMBER;
  return POLICIES.UNKNOWN;
}

export const currentUserId = "0"
export const TEST_DATA = {
  users: {
    "0": {
      uid: "0",
      username: 'khoa',
      groups: [
        "0", "1",
      ],
    },

    "1" : {
      uid: "1",
      username: 'not khoa',
      groups: [
        "0", "1",
      ],
    }
  },

  groups: {
    "0": {
      gid: "0",
      name: "this is a group",
      owner: "0",
      admins: [
        "0",
      ],
      members: [

      ],
      tasks: [
        {
          id: "0",
          title: "hi 12345",
          description: "",
          dueTime: new Date(),
          done: false,
          pinned: false, 
        },

      ]
    },

    "1": {
      gid: "1",
      owner: "1",
      name: "another group",
      admins: [
        "1",
      ],
      members: [
        "0",
      ],
    }
  },
}

const TEST_DATA_OLD = {
  users: [
    {
      id: 0,
      name: 'khoa',
      groups: [
        {
          id: 0, 
          policy: POLICIES.OWNER,
        },
        {
          id: 2,
          policy: POLICIES.MEMBER,
        }
      ],

      invitations: [
        {
          id: 0,
          name: 'another group',
          uid: 1,
          uName: 'not khoa'
        }
      ],

    }
  ],

  groups: [
    {
      id: 0,
      name: 'It has a name',
      users: [
        {
          id: 0,
          name: 'khoa',
          policy: POLICIES.OWNER,
        }
      ],
      tasks: [
        {
          id: 0,
          name: '123',
          description: '123456',
          dueDate: '22/22/2022',
          participants: [
            {
              id: 0,
              done: false,
            }
          ],
        }
      ],
    },

    {
      id: 1,
      name: 'another group',
      users: [],
      tasks: [],
    },

    { 
      id: 2,
      name: 'Starving',
      users: [
        {
          id: 0,
          name: 'khoa',
          policy: POLICIES.MEMBER,
        }
      ],

      tasks: [
        {
          id: 0,
          name: 'Alo alo',
          description: '123456',
          dueDate: '01/012022',
          participants: [
            {
              id: 0,
              done: false,
            }
          ],
        }
      ],
    }
  ],
}