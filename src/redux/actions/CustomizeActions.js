export const CHANGE_THEME = "CHANGE_THEME";
export const CHANGE_FONT = "CHANGE_FONT";
export const CHANGE_SIZE = "CHANGE_SIZE";
export const GET_THEME = "GET_THEME";

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

