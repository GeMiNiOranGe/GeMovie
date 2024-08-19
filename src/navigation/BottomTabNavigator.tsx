import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeStack, SearchStack } from '@navigation';

const BottomTab = createBottomTabNavigator();

class BottomTabNavigator extends React.Component {
  render(): React.JSX.Element {
    return (
      <BottomTab.Navigator screenOptions={{ headerShown: false }}>
        <BottomTab.Screen
          name='HomeStack'
          component={HomeStack}
          options={{
            title: 'Home',
          }}
        />

        <BottomTab.Screen
          name='SearchStack'
          component={SearchStack}
          options={{
            title: 'Search',
          }}
        />
      </BottomTab.Navigator>
    );
  }
}

export default BottomTabNavigator;
