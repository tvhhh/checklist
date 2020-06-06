import { DefaultTheme } from '@react-navigation/native'

const Dark = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#607d8b',
  }
}

const Light = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#8bc34a',
  }
}

export default Themes={
  Dark,
  Light,
}
