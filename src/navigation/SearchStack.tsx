import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { RootStackParamList } from '@shared/types';
import { SearchScreen, MovieDetailScreen } from '@screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

class SearchStack extends React.Component {
  render(): React.JSX.Element {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name='SearchScreen'
          component={SearchScreen}
          options={{
            title: 'Search',
          }}
        />

        <Stack.Screen
          name='MovieDetailScreen'
          component={MovieDetailScreen}
          options={{
            title: 'Detail',
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default SearchStack;
