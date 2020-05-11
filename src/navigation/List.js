import React from 'react';
import { View, } from 'react-native';
import Header from '../components/Header/index';
import TaskList from '../components/TaskList/index';
import Search from '../components/SearchBar/index';
import Button from '../components/Button/index';
import colors from '../styles/colors';

const List = (props) => {
  const list = [
    { text: "Finish SE Quiz", time: "TODAY, 10:00 PM" },
    { text: "Finish PSE Report", time: "TODAY, 10:01 PM" },
    { text: "Finish OS Quiz", time: "TODAY, 10:02 PM" },
    { text: "Finish SE Quiz", time: "TODAY, 10:00 PM" },
    { text: "Finish PSE Report", time: "TODAY, 10:01 PM" },
    { text: "Finish OS Quiz", time: "TODAY, 10:02 PM" },
    { text: "Finish SE Quiz", time: "TODAY, 10:00 PM" },
    { text: "Finish PSE Report", time: "TODAY, 10:01 PM" },
    { text: "Finish OS Quiz", time: "TODAY, 10:02 PM" },
    { text: "Finish SE Quiz", time: "TODAY, 10:00 PM" },
    { text: "Finish PSE Report", time: "TODAY, 10:01 PM" },
    { text: "Finish OS Quiz", time: "TODAY, 10:02 PM" },
    { text: "Finish SE Quiz", time: "TODAY, 10:00 PM" },
    { text: "Finish PSE Report", time: "TODAY, 10:01 PM" },
    { text: "Finish OS Quiz", time: "TODAY, 10:02 PM" },
    { text: "Finish SE Quiz", time: "TODAY, 10:00 PM" },
    { text: "Finish PSE Report", time: "TODAY, 10:01 PM" },
    { text: "Finish OS Quiz", time: "TODAY, 10:02 PM" },
    { text: "Finish SE Quiz", time: "TODAY, 10:00 PM" },
    { text: "Finish PSE Report", time: "TODAY, 10:01 PM" },
    { text: "Finish OS Quiz", time: "TODAY, 10:02 PM" },
    { text: "Finish SE Quiz", time: "TODAY, 10:00 PM" },
    { text: "Finish PSE Report", time: "TODAY, 10:01 PM" },
    { text: "Finish OS Quiz", time: "TODAY, 10:02 PM" },
    { text: "Finish SE Quiz", time: "TODAY, 10:00 PM" },
    { text: "Finish PSE Report", time: "TODAY, 10:01 PM" },
    { text: "Finish OS Quiz", time: "TODAY, 10:02 PM" },
    { text: "Finish SE Quiz", time: "TODAY, 10:00 PM" },
    { text: "Finish PSE Report", time: "TODAY, 10:01 PM" },
    { text: "Finish OS Quiz", time: "TODAY, 10:02 PM" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.GhostWhite }}>
      <Header title="Noteras" />
      <Search 
        placeholder="Search here..."
      />
      <TaskList taskList={list} />
      <Button.Plus />
    </View>
  ); 
};

export default List;
