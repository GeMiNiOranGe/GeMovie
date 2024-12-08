/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
} from 'react-native';
import React from 'react';
import { colors } from '@shared/themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ForgotPasswordScreenState, RootScreenProps } from '@shared/types';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import styles from './style';

class ForgotPassword extends React.Component<
  RootScreenProps<'ForgotPasswordScreen'>,
  ForgotPasswordScreenState
> {
  public constructor(props: RootScreenProps<'ForgotPasswordScreen'>) {
    super(props);
    this.state = {
      email: '',
      emailEmptyError: false,
      emailNotFoundError: false,
      successMessage: '',
    };
  }

  private handleGoBack = () => {
    this.props.navigation.goBack();
  };

  private handleReset = async () => {
    const { email } = this.state;

    if (!email.trim()) {
      this.setState({
        emailEmptyError: true,
        emailNotFoundError: false,
        successMessage: '',
      });
      return;
    }

    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email.trim());
      this.setState({
        successMessage: 'Password reset email sent. Please check your inbox.',
        emailEmptyError: false,
        emailNotFoundError: false,
      });
    } catch (error) {
      console.error('Error sending password reset email:', error);
      this.setState({
        emailEmptyError: false,
        emailNotFoundError: true,
        successMessage: '',
      });
    }
  };

  public override render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps='handled'
          >
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
                <Text style={styles.forgotText}>Forgot Password</Text>
                <View style={styles.inputContainer}>
                  <Ionicons
                    name='mail-outline'
                    size={30}
                    color={colors.secondary}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder='Enter your Email'
                    placeholderTextColor={colors.secondary}
                    keyboardType='email-address'
                    onChangeText={text =>
                      this.setState({
                        email: text,
                        emailEmptyError: false,
                        emailNotFoundError: false,
                      })
                    }
                  />
                </View>
                {this.state.emailEmptyError && (
                  <Text style={styles.errorText}>Please input your Email</Text>
                )}
                {this.state.emailNotFoundError && (
                  <Text style={styles.errorText}>
                    Email not found. Please try again.
                  </Text>
                )}
                {this.state.successMessage && (
                  <Text style={styles.forgotText}>
                    {this.state.successMessage}
                  </Text>
                )}
                <TouchableOpacity
                  style={styles.loginButtonWrapper}
                  onPress={this.handleReset}
                >
                  <Text style={styles.loginText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

export default ForgotPassword;
