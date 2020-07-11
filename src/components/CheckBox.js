import React from 'react';
import { CheckBox } from 'react-native-elements';


export default class CheckButton extends React.Component {
  getCheckBoxProps = name => {
    switch(name) {
      case "done":
        return {
          uncheckedIcon:"circle-o", 
          checkedIcon:"check-circle", 
          checkedColor:"forestgreen",
        };
      case "pinned":
        return {
          uncheckedIcon:"star-o",
          checkedIcon:"star",
          checkedColor:"gold",
        };
      default:
        return null;
    }
  }

  render() {
    let name = this.props.name;
    const checkBoxProps = this.getCheckBoxProps(name);

    return (
      <>
        <CheckBox 
          {...checkBoxProps}
          checked={this.props.checked} 
          onPress={this.props.onPress}
        />
      </>
    );
  }
};
