import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MovieDetailScreen, TrendingScreen } from '@screens';
import { RootStackParamList } from '@shared/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

class TrendingStack extends React.Component {
  public override render(): React.JSX.Element {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name='TrendingScreen'
          component={TrendingScreen}
          options={{
            title: 'Trending',
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

export default TrendingStack;
