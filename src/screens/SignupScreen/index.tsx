/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '@shared/themes';
import { Google } from 'iconsax-react-native';
import { RootScreenProps, SignupScreenState } from '@shared/types';
import styles from './style';

class SignupScreen extends React.Component<
  RootScreenProps<'SignupScreen'>,
  SignupScreenState
> {
  public constructor(props: RootScreenProps<'SignupScreen'>) {
    super(props);
    this.state = {
      secureEntery: true,
      isLoading: true,
      password: '',
      passwordErrors: {
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
      },
      showPasswordErrors: false,
    };
  }

  private togglePasswordVisibility = () => {
    this.setState(prevState => ({
      secureEntery: !prevState.secureEntery,
    }));
  };

  private validatePassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return passwordRegex.test(password);
  };

  private handleGoBack = () => {
    this.props.navigation.goBack();
  };

  private handleLogin = () => {
    this.props.navigation.navigate('LoginScreen');
  };

  private handlePasswordChange = (password: string) => {
    const passwordErrors = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[@$!%*?&#]/.test(password),
    };

    this.setState({
      password,
      passwordErrors,
      showPasswordErrors: password.trim() !== '',
    });
  };

  public override render() {
    const { secureEntery, showPasswordErrors, passwordErrors } = this.state;

    return (
      <ScrollView style={styles.container}>
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

        <View style={styles.textContainer}>
          <Text style={styles.headingText}>Let&apos;s get</Text>
          <Text style={styles.headingText}>started</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Ionicons
              name='person-outline'
              size={30}
              color={colors.secondary}
            />
            <TextInput
              style={styles.textInput}
              placeholder='Enter your Username'
              placeholderTextColor={colors.secondary}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name='call-outline' size={30} color={colors.secondary} />
            <TextInput
              style={styles.textInput}
              placeholder='Enter your Phone Number'
              placeholderTextColor={colors.secondary}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name='lock-closed-outline'
              size={30}
              color={colors.secondary}
            />
            <TextInput
              style={styles.textInput}
              placeholder='Enter your password'
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
                - At least 1 special character (@$!%*?&#)
              </Text>
            </View>
          )}

          <TouchableOpacity style={styles.loginButtonWrapper}>
            <Text style={styles.loginText}>Sign up</Text>
          </TouchableOpacity>

          <Text style={styles.continueText}>or continue with</Text>

          <TouchableOpacity style={styles.googleButtonContainer}>
            <Google style={styles.googleImage} />
            <Text style={styles.googleText}>Google</Text>
          </TouchableOpacity>

          <View style={styles.footerContainer}>
            <Text style={styles.accountText}>Already have an account!</Text>
            <TouchableOpacity onPress={this.handleLogin}>
              <Text style={styles.signupText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default SignupScreen;
