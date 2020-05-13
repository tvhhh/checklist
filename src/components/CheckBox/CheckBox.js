import React from 'react';
import { CheckBox } from 'react-native-elements';

export default class CheckButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false,
    }
  }

  render() {
    let name = this.props.name;
    let check;
    if (name === "done") {
      check = <CheckBox 
        uncheckedIcon="circle-o" 
        checkedIcon="check-circle" checkedColor="green"
        checked={this.state.checked} 
        onPress={() => this.setState({checked: !this.state.checked})}/>
    } else if (name === "marked") { 
      check = <CheckBox 
        uncheckedIcon="star-o" 
        checkedIcon="star" 
        checkedColor="yellow" 
        checked={this.state.checked} 
        onPress={() => this.setState({checked: !this.state.checked})}/>
    }

    return ( <>{check}</> );
  }
};
