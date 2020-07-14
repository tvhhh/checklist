import { CHANGE_THEME, CHANGE_SIZE, CHANGE_FONT} from '../actions/CustomizeActions'
const initialState = {
  darkTheme: false,
  font: "sans-serif",
  fontSize: 25,
};

export default function customizeReducer(state = initialState, action) {
  const payload = action.payload;

  switch (action.type) {
    case CHANGE_THEME:
      return { ...state, darkTheme: !state.darkTheme } 
    case CHANGE_FONT:
      return {...state, font: payload.font }
    case CHANGE_SIZE:
      switch (payload.size) {
        case "small":
          return { ...state, fontSize: 20 };
        case "medium":
          return { ...state, fontSize: 25 };
        case "large":
          return { ...state, fontSize: 30 };
      }
    default:
      return state;
  }
};
