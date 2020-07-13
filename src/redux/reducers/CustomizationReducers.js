import { CHANGE_THEME, CHANGE_SIZE, CHANGE_FONT} from '../actions/CustomizeActions'
const initialState = {
  darkTheme: false,
};

export default function customizeReducer(state = initialState, action) {
  const payload = action.payload;

  switch (action.type) {
    case CHANGE_THEME:
      return { ...state, darkTheme: !state.darkTheme, } 
    // case CHANGE_SIZE:
    //   return {  };
    default:
      return state;
  }
};
