import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, SearchNormal1, User } from 'iconsax-react-native';

import { activeIcon, normalIcon } from '@shared/constants';
import { TabBarIconProps } from '@shared/types';
import { HomeStack, SearchStack } from '@navigation';
import UserStack from './UserStack';

const BottomTab = createBottomTabNavigator();

class MainBottomTab extends React.Component {
  private renderHomeIcon({
    focused,
    color,
    size,
  }: TabBarIconProps): React.JSX.Element {
    return (
      <Home
        size={size}
        color={color}
        variant={focused ? activeIcon : normalIcon}
      />
    );
  }

  private renderSearchIcon({
    focused,
    color,
    size,
  }: TabBarIconProps): React.JSX.Element {
    return (
      <SearchNormal1
        size={size}
        color={color}
        variant={focused ? activeIcon : normalIcon}
      />
    );
  }

  private renderUserIcon({
    focused,
    color,
    size,
  }: TabBarIconProps): React.JSX.Element {
    return (
      <User
        size={size}
        color={color}
        variant={focused ? activeIcon : normalIcon}
      />
    );
  }

  public override render(): React.JSX.Element {
    return (
      <BottomTab.Navigator
        initialRouteName='HomeStack'
        screenOptions={{
          headerShown: false,
        }}
      >
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

        <BottomTab.Screen
          name='UserStack'
          component={UserStack}
          options={{
            title: 'User',
            tabBarIcon: this.renderUserIcon,
          }}
        />
      </BottomTab.Navigator>
    );
  }
}

export default MainBottomTab;
