import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { connect } from 'react-redux';

import Header from '../Header';

import screenStyles from './ScreenStyles';
import colors from '../../styles/colors';

import { extractDateTime, getWeekDates } from '../../utils/DateTime';


class UpcomingTasks extends React.Component {
  constructor(props) {
    super(props);
  }

  getWeekTasksCount = taskList => {
    var [start, end] = getWeekDates();
    var tasks = {};
    var current = new Date(start);
    while (current < end) {
      tasks[extractDateTime(current).date.slice(5)] = 0;
      current.setDate(current.getDate() + 1);
    }
    taskList.filter(task => task.dueTime <= end && task.dueTime >= start).forEach(task => {
      const title = extractDateTime(task.dueTime).date.slice(5);
      tasks[title]++;
    });
    return tasks;
  }

  getCategoriesCount = taskList => {
    var categories = ["health", "workout", "work", "study", "payment", "entertainment", "uncategorized"];
    var tasks = {};
    categories.forEach(category => {
      tasks[category.charAt(0).toUpperCase() + category.slice(1)] = 0;
    });
    taskList.filter(task => task.dueTime > new Date()).forEach(task => {
      const title = task.category.charAt(0).toUpperCase() + task.category.slice(1);
      tasks[title]++;
    });
    if (taskList.length === 0) tasks["Uncategorized"] = 1;
    return tasks;
  }

  render() {
    const weekTasks = this.getWeekTasksCount(this.props.taskList);
    const weekLabels = Object.keys(weekTasks);
    const weekCounts = weekLabels.map(key => weekTasks[key]);
    const weekData = {
      labels: weekLabels,
      datasets: [
        { data: weekCounts },
      ],
    };

    // console.log(Math.max(...weekCounts));

    const categoriesTasks = this.getCategoriesCount(this.props.taskList);
    const categories = Object.keys(categoriesTasks);
    const categoriesData = categories.map(key => ({
      name: key,
      population: categoriesTasks[key],
      color: colors[key],
      legendFontColor: "#7F7F7F",
      legendFontSize: 16,
    }));

    const chartConfig = {
      backgroundGradientFromOpacity: 0,
      backgroundGradientToOpacity: 0,
      color: () => colors.PrimaryColor,
      strokeWidth: 2,
    };

    return (
      <ScrollView style={screenStyles.screenContainer}>
        <View style={styles.graphContainer}>
          <Header navigation={this.props.navigation} title="DASHBOARD" />
          <Text style={styles.graphTitle}>My week</Text>
          <LineChart
            data={weekData}
            width={Dimensions.get("window").width}
            height={300}
            chartConfig={chartConfig}
            yLabelsOffset={20}
            withInnerLines={false}
            segments={Math.max(...weekCounts)}
          />
          <Text style={styles.graphTitle}>My tasks</Text>
          <PieChart
            data={categoriesData}
            width={Dimensions.get("window").width}
            height={260}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  graphContainer: {
    paddingVertical: 10,
  },
  graphTitle: {
    color: colors.TitleText,
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 5,
  },
});

const mapStateToProps = state => ({
  taskList: state.userData.data.tasks,
});

export default connect(mapStateToProps)(UpcomingTasks)
