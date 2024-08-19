import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { MainBottomTab } from '@navigation';

class App extends React.Component {
  render(): React.JSX.Element {
    return (
      <NavigationContainer>
        <MainBottomTab />
      </NavigationContainer>
    );
  }
}

export default App;
