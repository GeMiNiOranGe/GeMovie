import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen, MovieDetailScreen, SeeAllMoviesScreen } from '@screens';
import { RootStackParamList } from '@shared/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

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
        <Stack.Screen
          name='SeeAllScreen'
          component={SeeAllMoviesScreen}
          options={{
            headerShown: true,
            title: 'All',
          }}
        />
        <Stack.Screen
          name='MovieDetailScreen'
          component={MovieDetailScreen}
          options={{ title: 'Detail' }}
        />
      </Stack.Navigator>
    );
  }
}

export default HomeStack;
