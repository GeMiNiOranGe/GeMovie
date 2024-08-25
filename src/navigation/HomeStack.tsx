import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '@screens';

const Stack = createNativeStackNavigator();

class HomeStack extends React.Component {
  public override render(): React.JSX.Element {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name='HomeScreen'
          component={HomeScreen}
          options={{
            title: 'Home',
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default HomeStack;
