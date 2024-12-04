/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import React from 'react';
import { colors } from '@shared/themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ResetPasswordScreenState, RootScreenProps } from '@shared/types';
import styles from './style';

class ResetPasswordScreen extends React.Component<
  RootScreenProps<'ResetPasswordScreen'>,
  ResetPasswordScreenState
> {
  public constructor(props: RootScreenProps<'ResetPasswordScreen'>) {
    super(props);
    this.state = {
      secureEntery: true,
      password: '',
      passwordErrors: {
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
      },
      showPasswordErrors: false,
      matchPassword: false,
      resetError: '',
    };
  }
  private handleGoBack = () => {
    this.props.navigation.goBack();
  };

  private handleReset = () => {
    const { passwordErrors, matchPassword, password } = this.state;
    const hasErrors =
      Object.values(passwordErrors).some(error => !error) || matchPassword;
    if (hasErrors || password.trim() === '') {
      this.setState({
        resetError: 'Please try again',
      });
    } else {
      this.setState({ resetError: '' });
      this.props.navigation.navigate('LoginScreen');
    }
  };

  private togglePasswordVisibility = () => {
    this.setState(prevState => ({
      secureEntery: !prevState.secureEntery,
    }));
  };

  private handlePasswordChange = (password: string) => {
    const passwordErrors = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[@$!%*?&#]/.test(password),
    };
    const validPassword = Object.values(passwordErrors).every(error => error);

    this.setState({
      password,
      passwordErrors,
      showPasswordErrors: password.trim() !== '' && !validPassword,
    });
  };

  private checkRetypePassword = (password: string) => {
    this.setState({
      matchPassword: this.state.password !== password,
    });
  };

  public override render() {
    const { secureEntery, showPasswordErrors, passwordErrors, matchPassword } =
      this.state;
    const { height } = Dimensions.get('window');
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
                <View
                  style={[
                    styles.boxContainer,
                    {
                      height: this.state.showPasswordErrors
                        ? height * 0.7
                        : height * 0.55,
                    },
                  ]}
                >
                  <Text style={styles.forgotText}>Reset Password</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons
                      name='lock-closed-outline'
                      size={30}
                      color={colors.secondary}
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder='Enter your new password'
                      placeholderTextColor={colors.secondary}
                      secureTextEntry={secureEntery}
                      onChangeText={this.handlePasswordChange}
                    />
                    <TouchableOpacity onPress={this.togglePasswordVisibility}>
                      <Ionicons
                        name={secureEntery ? 'eye-off-outline' : 'eye-outline'}
                        size={20}
                        color={colors.secondary}
                      />
                    </TouchableOpacity>
                  </View>
                  {showPasswordErrors && (
                    <View style={styles.errorListContainer}>
                      <Text
                        style={{
                          color: passwordErrors.length ? 'green' : 'red',
                          ...styles.errorText,
                        }}
                      >
                        * At least 8 characters
                      </Text>
                      <Text
                        style={{
                          color: passwordErrors.uppercase ? 'green' : 'red',
                          ...styles.errorText,
                        }}
                      >
                        * At least 1 uppercase letter
                      </Text>
                      <Text
                        style={{
                          color: passwordErrors.lowercase ? 'green' : 'red',
                          ...styles.errorText,
                        }}
                      >
                        * At least 1 lowercase letter
                      </Text>
                      <Text
                        style={{
                          color: passwordErrors.number ? 'green' : 'red',
                          ...styles.errorText,
                        }}
                      >
                        * At least 1 number
                      </Text>
                      <Text
                        style={{
                          color: passwordErrors.specialChar ? 'green' : 'red',
                          ...styles.errorText,
                        }}
                      >
                        * At least 1 special character (@$!%*?&#)
                      </Text>
                    </View>
                  )}
                  <View style={styles.inputContainer}>
                    <Ionicons
                      name='lock-closed-outline'
                      size={30}
                      color={colors.secondary}
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder='Retype new password'
                      placeholderTextColor={colors.secondary}
                      secureTextEntry={secureEntery}
                      onChangeText={this.checkRetypePassword}
                    />
                  </View>
                  {matchPassword && (
                    <Text style={styles.errorText}>
                      Passwords do not match{' '}
                    </Text>
                  )}
                  <TouchableOpacity
                    style={styles.loginButtonWrapper}
                    onPress={this.handleReset}
                  >
                    <Text style={styles.loginText}>Reset</Text>
                  </TouchableOpacity>
                  {this.state.resetError !== '' && (
                    <Text style={styles.errorReset}>
                      {this.state.resetError}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

export default ResetPasswordScreen;
