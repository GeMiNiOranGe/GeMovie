import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { BottomTabNavigator } from '@navigation';

class App extends React.Component {
  render(): React.JSX.Element {
    return (
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    );
  }
}

export default App;
