import { CHANGE_THEME, CHANGE_SIZE, CHANGE_FONT, GET_CUSTOMIZATION} from '../actions/CustomizeActions'
import { storeCustomization } from '../../api';

const initialState = {
  darkTheme: false,
  font: "sans-serif",
  fontSize: 25,
  switchValue: false,
};

export default function customizeReducer(state = initialState, action) {
  const payload = action.payload;
  let newCustomization = state;

  switch (action.type) {
    case GET_CUSTOMIZATION:
      let customization = JSON.parse(payload.customization)
      if (payload.customization !== null) return {...customization}
      return {...state}

    case CHANGE_THEME:
      newCustomization = {...state, darkTheme: !state.darkTheme, switchValue: !state.switchValue}
      storeCustomization(JSON.stringify(newCustomization))
      return { ...state, darkTheme: !state.darkTheme, switchValue: !state.switchValue} 

    case CHANGE_FONT:
      newCustomization = {...state, font: payload.font }
      storeCustomization(JSON.stringify(newCustomization))
      return {...state, font: payload.font }

    case CHANGE_SIZE:
      switch (payload.size) {
        case "small":
          newCustomization = { ...state, fontSize: 20 }
          storeCustomization(JSON.stringify(newCustomization))
          return { ...state, fontSize: 20 };
        case "medium":
          newCustomization = { ...state, fontSize: 25 }
          storeCustomization(JSON.stringify(newCustomization))
          return { ...state, fontSize: 25 };
        case "large":
          newCustomization = { ...state, fontSize: 30 }
          storeCustomization(JSON.stringify(newCustomization))
          return { ...state, fontSize: 30 };
      }
    default:
      return state;
  }
};
