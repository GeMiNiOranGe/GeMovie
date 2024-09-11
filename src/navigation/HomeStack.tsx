import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen, SeeAllMoviesScreen } from '@screens';

const Stack = createNativeStackNavigator();

class HomeStack extends React.Component {
  public override render(): React.JSX.Element {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name='HomeScreen'
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='SeeAllScreen'
          component={SeeAllMoviesScreen}
          options={{
            headerShown: true,
            title: 'All',
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default HomeStack;
