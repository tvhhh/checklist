import { CHANGE_THEME, CHANGE_SIZE, CHANGE_FONT, GET_CUSTOMIZATION} from '../actions/CustomizeActions'
import { storeCustomization } from '../../api';
import { smallFonts, mediumFonts, largeFonts } from '../../styles/fonts'
import { lightTheme, darkTheme } from '../../styles/colors'

const initialState = {
  darkTheme: false,
  theme: {...lightTheme},
  font: "sans-serif",
  fontSize: {...mediumFonts},
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
      switch (state.darkTheme) {
        case false:
          newCustomization = {...state, darkTheme: true, theme: {...darkTheme}, switchValue: true}
          storeCustomization(JSON.stringify(newCustomization))
          return newCustomization;
        case true:
          newCustomization = {...state, darkTheme: false ,theme: {...lightTheme}, switchValue: false}
          storeCustomization(JSON.stringify(newCustomization))
          return newCustomization;
        default: return {...state}
      }

    case CHANGE_FONT:
      newCustomization = {...state, font: payload.font }
      storeCustomization(JSON.stringify(newCustomization))
      return {...state, font: payload.font }

    case CHANGE_SIZE:
      switch (payload.size) {
        case "small":
          newCustomization = { ...state, fontSize: {...smallFonts} }
          storeCustomization(JSON.stringify(newCustomization))
          return newCustomization;
        case "medium":
          newCustomization = { ...state, fontSize: {...mediumFonts} }
          storeCustomization(JSON.stringify(newCustomization))
          return newCustomization;
        case "large":
          newCustomization = { ...state, fontSize: {...largeFonts} }
          storeCustomization(JSON.stringify(newCustomization))
          return newCustomization;
      }
    default:
      return state;
  }
};
