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
  Animated,
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
      emailFocus: false,
      animatedEmail: new Animated.Value(0),
    };
  }

  private focusTextInput = (): void => {
    Animated.timing(this.state.animatedEmail, {
      toValue: -13,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  private blurTextInput = (): void => {
    if (!this.state.email.trim()) {
      Animated.timing(this.state.animatedEmail, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  private handleGoBack = (): void => {
    this.props.navigation.goBack();
  };

  private handleReset = async (): Promise<void> => {
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

  public override render(): JSX.Element {
    const { email, animatedEmail, emailFocus } = this.state;
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
              <Text style={styles.forgotText}>Forgot Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name='mail-outline'
                  size={30}
                  color={colors.accent.dark}
                />
                {email || emailFocus ? (
                  <Animated.Text
                    style={{
                      position: 'absolute',
                      left: 55,
                      top: animatedEmail,
                      fontSize: 14,
                      color: '#2c3e50',
                      fontWeight: 'bold',
                      backgroundColor: 'white',
                    }}
                  >
                    Email
                  </Animated.Text>
                ) : null}
                <TextInput
                  style={styles.textInput}
                  placeholder={email || emailFocus ? '' : 'example@gmail.com'}
                  keyboardType='email-address'
                  autoCapitalize='none'
                  onFocus={() => {
                    this.setState({ emailFocus: true });
                    this.focusTextInput();
                  }}
                  onBlur={() => {
                    this.setState({ emailFocus: false });
                    this.blurTextInput();
                  }}
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
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

export default ForgotPassword;
