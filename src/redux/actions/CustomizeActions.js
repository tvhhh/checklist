import { fetchCustomization } from '../../api';

export const CHANGE_THEME = "CHANGE_THEME";
export const CHANGE_FONT = "CHANGE_FONT";
export const CHANGE_SIZE = "CHANGE_SIZE";
export const GET_CUSTOMIZATION = "GET_CUSTOMIZATION";

export const getCustomization = customization => ({
  type: GET_CUSTOMIZATION,
  payload: {
    customization,
  }
});

export const changeTheme = () => ({
  type: CHANGE_THEME,
});

export const changeFont = font => ({
  type: CHANGE_FONT,
  payload: {
    font
  },
});

export const changeSize = size => ({
  type: CHANGE_SIZE,
  payload: {
    size,
  },
});

export const fetchCustomData = () => async (dispatch) => {
  try {
    let customization = await fetchCustomization();
    dispatch(getCustomization(customization));
  } catch(error) {
    console.log(`Fetch error: ${error}`);
  }
};

