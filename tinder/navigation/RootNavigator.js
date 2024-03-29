import React from 'react';
import { StackNavigator } from 'react-navigation';
import TabNavigator from './TabNavigator';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: TabNavigator,
    },
  }
);

export default class RootNavigator extends React.Component {
  render() {
    return <RootStackNavigator/>;
  }
}