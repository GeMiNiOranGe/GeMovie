import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  PersonDetailScreen,
  HomeScreen,
  MovieDetailScreen,
  SeeAllMoviesScreen,
  TvShowDetailScreen,
  SeeAllPerson,
  CompanyDetailScreen,
  CollectionDetailScreen,
  TrendingScreen,
  ContentListScreen,
} from '@screens';
import { RootStackParamList } from '@shared/types';
import AllTV from 'src/screens/SeeAllTV';
import TopRated from 'src/screens/SeeAllTopRated';

const Stack = createNativeStackNavigator<RootStackParamList>();

class HomeStack extends React.Component {
  public override render(): React.JSX.Element {
    return (
      <Stack.Navigator initialRouteName='HomeScreen'>
        <Stack.Screen
          name='HomeScreen'
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name='SeeAllMovieScreen'
          component={SeeAllMoviesScreen}
          options={{
            title: 'Popular Movies',
          }}
        />

        <Stack.Screen
          name='SeeAllPersonScreen'
          component={SeeAllPerson}
          options={{
            title: 'Popular People',
          }}
        />

        <Stack.Screen
          name='SeeAllTV'
          component={AllTV}
          options={{
            title: 'Popular TV Shows',
          }}
        />

        <Stack.Screen
          name='SeeAllTopRated'
          component={TopRated}
          options={{
            title: 'Ranking',
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
          name='MovieDetailScreen'
          component={MovieDetailScreen}
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
          name='TvShowDetailScreen'
          component={TvShowDetailScreen}
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

        <Stack.Screen
          name='CompanyDetailScreen'
          component={CompanyDetailScreen}
          options={{
            title: 'Detail',
          }}
        />

        <Stack.Screen
          name='TrendingScreen'
          component={TrendingScreen}
          options={{
            title: 'Trending',
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default HomeStack;
