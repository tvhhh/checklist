export const INIT_TASK_LIST = "INIT_TASK_LIST";
export const CREATE_TASK = "CREATE_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const REMOVE_TASK = "REMOVE_TASK";

export const initializeTaskList = taskList => ({
  type: INIT_TASK_LIST,
  payload: {
    taskList,
  },
});

export const createTask = task => ({
  type: CREATE_TASK,
  payload: {
    task,
  },
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
