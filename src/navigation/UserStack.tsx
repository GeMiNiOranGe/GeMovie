import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ForgotPassword,
  LoginScreen,
  ResetPasswordScreen,
  SignupScreen,
} from '@screens';
import { RootStackParamList } from '@shared/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

class UserStack extends React.Component {
  public override render(): React.JSX.Element {
    return (
      <Stack.Navigator initialRouteName='LoginScreen'>
        <Stack.Screen
          name='LoginScreen'
          component={LoginScreen}
          options={{ headerShown: false }}
        />
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
  }
}

export default UserStack;
