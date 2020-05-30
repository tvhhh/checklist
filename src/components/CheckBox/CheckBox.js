import React from 'react';
import { CheckBox } from 'react-native-elements';

export default class CheckButton extends React.Component {
  render() {
    let name = this.props.name;
    switch(name) {
      case "done":
        return (
          <>
            <CheckBox 
              uncheckedIcon="circle-o" 
              checkedIcon="check-circle" checkedColor="forestgreen"
              checked={this.props.checked} 
              onPress={this.props.onPress}
            />
          </>
        );
      case "pinned":
        return (
          <>
            <CheckBox 
              uncheckedIcon="star-o" 
              checkedIcon="star" 
              checkedColor="gold" 
              checked={this.props.checked} 
              onPress={this.props.onPress}
            />
          </>
        );
      default:
        return null;
    };
  }
};
