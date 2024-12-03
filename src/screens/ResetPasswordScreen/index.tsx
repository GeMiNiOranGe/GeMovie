import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { colors } from '@shared/themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RootScreenProps } from '@shared/types';
import styles from './style';
import { TextInput } from 'react-native-paper';

class ResetPasswordScreen extends React.Component<
  RootScreenProps<'ResetPasswordScreen'>
> {
  private handleGoBack = () => {
    this.props.navigation.goBack();
  };

  private handleReset = () => {
    this.props.navigation.navigate('LoginScreen');
  };

  public override render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButtonWrapper}
          onPress={this.handleGoBack}
        >
          <Ionicons
            name='arrow-back-outline'
            color={colors.primary}
            size={25}
          />
        </TouchableOpacity>

        <View style={styles.formContainer}>
          <View style={styles.boxContainer}>
            <Text style={styles.forgotText}>Reset Password</Text>
            <TextInput
              style={styles.inputContainer}
              placeholder='Enter your New Password'
              placeholderTextColor={colors.secondary}
              autoCapitalize='none'
              mode='flat'
              underlineColor='transparent'
              theme={{
                colors: {
                  primary: 'transparent',
                },
              }}
            />
            <TextInput
              style={styles.inputContainer}
              placeholder='Retype New Password'
              placeholderTextColor={colors.secondary}
              autoCapitalize='none'
              mode='flat'
              underlineColor='transparent'
              theme={{
                colors: {
                  primary: 'transparent',
                },
              }}
            />
            <TouchableOpacity
              style={styles.loginButtonWrapper}
              onPress={this.handleReset}
            >
              <Text style={styles.loginText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default ResetPasswordScreen;
