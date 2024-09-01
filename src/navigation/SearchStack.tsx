import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { RootStackParamList } from '@shared/types';
import {
  SearchScreen,
  MovieDetailScreen,
  SearchSuggestionScreen,
} from '@screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

class SearchStack extends React.Component {
  public override render(): React.JSX.Element {
    return (
      <Stack.Navigator initialRouteName='SearchSuggestionScreen'>
        <Stack.Screen
          name='SearchScreen'
          component={SearchScreen}
          options={{
            title: 'Search',
            headerShown: false,
          }}
        />

        <Stack.Screen
          name='SearchSuggestionScreen'
          component={SearchSuggestionScreen}
          options={{
            title: 'Suggestion',
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
