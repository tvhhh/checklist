import React from 'react'
import { Text } from 'react-native'

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            ManagedGroupIds: [],
            JoinedGroupIds: [],
        }
    }
}

class Circle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            radius: this.props.raidus,
            color: this.props.color,
            styles = {
                width: this.state.radius,
                height: this.state.radius,
                borderRadius: this.state.radius/2,
                backgroudColor: this.state.color,
            },
        }

        render() {
            return(
                <View styles={this.state.styles} />
            );
        }
    }
}

class GroupTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            title: this.props.title,
            participantIds: [],
            dueTime: "",
            stateEnum = {
                NotRelated: 'not-related',
                NotDone:'not-done',
                Done:'done',
            },
            taskState: this.state.stateEnum.NotRelated,

            styles = {
                title: {
                    fontWeight: 18,
                },

                dueTime: {

                },

                participant: {

                },

                taskState: {

                },
            }
        }
    }

    render() {
        return(
            <View>

            </View>
        );
    }
}

export default class Group extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 0,
            name: "",
            userIds: [],
            groupTasks: [],
        }
    }

    render() {
        return (
            <Text> {this.state.displayText} </Text>
        );
    }
}