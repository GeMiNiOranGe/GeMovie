import React from 'react';
import {
  AnimatedTabBarNavigator,
  DotSize,
} from 'react-native-animated-nav-tab-bar';
import { Home, SearchNormal1 } from 'iconsax-react-native';

import { activeIcon, normalIcon } from '@shared/constants';
import { TabBarIconProps } from '@shared/types';
import { HomeStack, SearchStack } from '@navigation';
import { colors } from '@shared/themes';

const BottomTab = AnimatedTabBarNavigator();

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

  public override render(): React.JSX.Element {
    return (
      <BottomTab.Navigator
        initialRouteName='HomeStack'
        screenOptions={{
          headerShown: false,
        }}
        tabBarOptions={{
          activeTintColor: '#ffffff',
          inactiveTintColor: 'gray',
          activeBackgroundColor: colors.secondary,
        }}
        appearance={{
          dotSize: DotSize.SMALL,
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
      </BottomTab.Navigator>
    );
  }
}

export default MainBottomTab;
