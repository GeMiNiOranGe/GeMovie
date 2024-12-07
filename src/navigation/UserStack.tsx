import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ForgotPassword,
  LoginScreen,
  ResetPasswordScreen,
  SignupScreen,
  UserScreen,
} from '@screens';
import { RootStackParamList } from '@shared/types';
import { AuthContext } from 'src/context/AuthContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

class UserStack extends React.Component {
  public override render(): React.JSX.Element {
    return (
      <AuthContext.Consumer>
        {context => {
          if (!context) {
            return <></>;
          }

          const { isLoggedIn } = context;

          return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {!isLoggedIn ? (
                <Stack.Screen name='LoginScreen' component={LoginScreen} />
              ) : (
                <Stack.Screen name='UserScreen' component={UserScreen} />
              )}
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
              <Stack.Screen
                name='ResetPasswordScreen'
                component={ResetPasswordScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}

export default UserStack;
