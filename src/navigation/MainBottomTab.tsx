import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Global, Home, SearchNormal1 } from 'iconsax-react-native';

import { activeIcon, normalIcon } from '@shared/constants';
import { TabBarIconProps } from '@shared/types';
import { HomeStack, SearchStack, TrendingStack } from '@navigation';

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

  private renderTrendIcon({
    focused,
    color,
    size,
  }: TabBarIconProps): React.JSX.Element {
    return (
      <Global
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
          name='TrendingStack'
          component={TrendingStack}
          options={{
            title: 'Trend',
            tabBarIcon: this.renderTrendIcon,
          }}
        />
      </BottomTab.Navigator>
    );
  }
}

export default MainBottomTab;
