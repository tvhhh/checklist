import React from 'react';
import { CheckBox } from 'react-native-elements';

export default class CheckButton extends React.Component {
  render() {
    let name = this.props.name;
    let check;
    if (name === "done") {
      check = <CheckBox uncheckedIcon="circle-o" checkedIcon="check-circle" checkedColor="green" />
    } else if (name === "marked") {
      check = <CheckBox uncheckedIcon="star-o" checkedIcon="star" checkedColor="yellow" />
    }

    return ( <>{check}</> );
  }
};
