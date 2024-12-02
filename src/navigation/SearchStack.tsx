import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { RootStackParamList } from '@shared/types';
import {
  SearchScreen,
  MovieDetailScreen,
  SearchSuggestionScreen,
  CompanyDetailScreen,
  TvShowDetailScreen,
  CollectionDetailScreen,
  PersonDetailScreen,
  ContentListScreen,
  ReviewDetailScreen,
  GenreDetailScreen,
  NetworkDetailScreen,
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
          name='ContentListScreen'
          component={ContentListScreen}
          options={{
            title: 'Content list',
          }}
        />

        <Stack.Screen
          name='ReviewDetailScreen'
          component={ReviewDetailScreen}
          options={{
            title: 'Detail',
          }}
        />

        <Stack.Screen
          name='GenreDetailScreen'
          component={GenreDetailScreen}
          options={{
            title: 'Detail',
          }}
        />

        <Stack.Screen
          name='NetworkDetailScreen'
          component={NetworkDetailScreen}
          options={{
            title: 'Detail',
          }}
        />

        <Stack.Screen
          name='MovieDetailScreen'
          component={MovieDetailScreen}
          options={{
            title: 'Detail',
          }}
        />

        <Stack.Screen
          name='TvShowDetailScreen'
          component={TvShowDetailScreen}
          options={{
            title: 'Detail',
          }}
        />

        <Stack.Screen
          name='PersonDetailScreen'
          component={PersonDetailScreen}
          options={{
            title: 'Detail',
          }}
        />

        <Stack.Screen
          name='CompanyDetailScreen'
          component={CompanyDetailScreen}
          options={{
            title: 'Detail',
          }}
        />

        <Stack.Screen
          name='CollectionDetailScreen'
          component={CollectionDetailScreen}
          options={{
            title: 'Detail',
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default SearchStack;
