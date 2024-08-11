import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { HomeStack, SearchStack } from '@navigation';

const Tab = createBottomTabNavigator();

class App extends React.Component {
  render(): React.JSX.Element {
    return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen
            name='HomeStack'
            component={HomeStack}
            options={{
              title: 'Home',
            }}
          />

          <Tab.Screen
            name='SearchStack'
            component={SearchStack}
            options={{
              title: 'Search',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
