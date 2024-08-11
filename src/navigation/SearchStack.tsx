import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SearchScreen } from '@screens';

const Stack = createNativeStackNavigator();

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
      </Stack.Navigator>
    );
  }
}

export default SearchStack;
