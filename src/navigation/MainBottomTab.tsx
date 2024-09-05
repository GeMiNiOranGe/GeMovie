import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Octicons, Ionicons } from '@assets/icons';
import { TabBarIconProps } from '@shared/types';
import { HomeStack, SearchStack } from '@navigation';

const BottomTab = createBottomTabNavigator();

class MainBottomTab extends React.Component {
  private renderHomeIcon({ focused }: TabBarIconProps) {
    return <Octicons.HomeIcon size={24} color={focused ? 'black' : 'gray'} />;
  }

  private renderSearchIcon({ focused }: TabBarIconProps) {
    return <Ionicons.SearchIcon size={24} color={focused ? 'black' : 'gray'} />;
  }

  public override render(): React.JSX.Element {
    return (
      <BottomTab.Navigator screenOptions={{ headerShown: false }}>
        <BottomTab.Screen
          name='HomeStack'
          component={HomeStack}
          options={{
            title: 'Home',
            tabBarIcon: this.renderHomeIcon,
          }}
        />

        <BottomTab.Screen
          name='SearchStack'
          component={SearchStack}
          options={{
            title: 'Search',
            tabBarIcon: this.renderSearchIcon,
          }}
        />
      </BottomTab.Navigator>
    );
  }
}

export default MainBottomTab;
