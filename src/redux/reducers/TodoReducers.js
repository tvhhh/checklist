import { CREATE_TASK, EDIT_TASK, REMOVE_TASK } from '../actions/TodoActions';

const initialState = [];

export default function todoReducer(state = initialState, action) {
  const payload = action.payload;

  switch (action.type) {
    case CREATE_TASK:
      return [
        { id: (state.length == 0) ? 0 : state[0].id + 1, ...payload.task },
        ...state,
      ];
    case EDIT_TASK:
      return state.map(todo => (todo.id === payload.selected.id) ? { id: payload.selected.id, ...payload.task } : todo);
    case REMOVE_TASK:
      return state.filter(todo => todo.id !== payload.selected.id);
    default:
      return state;
  }
};
