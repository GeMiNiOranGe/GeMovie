import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ForgotPassword,
  LoginScreen,
  MovieDetailScreen,
  PersonDetailScreen,
  SeeAllFavoriteScreen,
  SignupScreen,
  TvShowDetailScreen,
  UserScreen,
} from '@screens';
import { RootStackParamList } from '@shared/types';
import { AuthContext } from 'src/context/AuthContext';
import { Text } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

class UserStack extends React.Component {
  public override render(): React.JSX.Element {
    return (
      <AuthContext.Consumer>
        {context => {
          if (!context) {
            return <Text>Loading...</Text>;
          }

          const { isLoggedIn } = context;

          return (
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
              initialRouteName={isLoggedIn ? 'UserScreen' : 'LoginScreen'}
            >
              {!isLoggedIn ? (
                <>
                  <Stack.Screen name='LoginScreen' component={LoginScreen} />
                  <Stack.Screen
                    name='SignupScreen'
                    component={SignupScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name='ForgotPasswordScreen'
                    component={ForgotPassword}
                    options={{ headerShown: false }}
                  />
                </>
              ) : (
                <>
                  <Stack.Screen name='UserScreen' component={UserScreen} />

                  <Stack.Screen
                    name='SeeAllFavoriteScreen'
                    component={SeeAllFavoriteScreen}
                    options={{
                      title: 'Favorites',
                      headerShown: true,
                    }}
                  />

                  <Stack.Screen
                    name='MovieDetailScreen'
                    component={MovieDetailScreen}
                    options={{
                      title: 'Detail',
                      headerShown: true,
                    }}
                  />

                  <Stack.Screen
                    name='PersonDetailScreen'
                    component={PersonDetailScreen}
                    options={{
                      title: 'Detail',
                      headerShown: true,
                    }}
                  />

                  <Stack.Screen
                    name='TvShowDetailScreen'
                    component={TvShowDetailScreen}
                    options={{
                      title: 'Detail',
                      headerShown: true,
                    }}
                  />
                </>
              )}
            </Stack.Navigator>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}

export default UserStack;
