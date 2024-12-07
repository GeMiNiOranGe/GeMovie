import React from 'react';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';

import { MainBottomTab } from '@navigation';

// FIXME: fix bug, remove `configureReanimatedLogger` to enable strict, set `strict: true`
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

class App extends React.Component {
  public override render(): React.JSX.Element {
    return (
      <NavigationContainer>
        <MainBottomTab />
      </NavigationContainer>
    );
  }
}

export default App;
