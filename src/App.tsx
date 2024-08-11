import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import HomeStack from '@navigation/HomeStack';

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
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
