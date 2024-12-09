/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '@shared/themes';
import { Google } from 'iconsax-react-native';
import { RootScreenProps, SignupScreenState } from '@shared/types';
import { collection, where, query, getDocs, addDoc } from 'firebase/firestore';
import { auth, db } from 'firebase.config';
import { hash } from 'bcrypt-ts';
import styles from './style';
import { createUserWithEmailAndPassword } from 'firebase/auth';

class SignupScreen extends React.Component<
  RootScreenProps<'SignupScreen'>,
  SignupScreenState
> {
  public constructor(props: RootScreenProps<'SignupScreen'>) {
    super(props);
    this.state = {
      username: '',
      email: '',
      secureEntery: true,
      isLoading: false,
      password: '',
      passwordErrors: {
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
      },
      showPasswordErrors: false,
      errors: {
        username: false,
        email: false,
        password: false,
      },
      errorMessages: {
        username: '',
        email: '',
        password: '',
      },
      emailErrorMessage: '',
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
    const validPassword = Object.values(passwordErrors).every(error => error);

    this.setState({
      password,
      passwordErrors,
      showPasswordErrors: password.trim() !== '' && !validPassword,
    });
  };

  private handleSignup = async () => {
    const { username, email, password, errors, errorMessages } = this.state;

    let updatedErrors = { ...errors };
    let updatedErrorMessages = { ...errorMessages };

    if (username.trim() === '') {
      updatedErrors.username = true;
      updatedErrorMessages.username = 'Username is required';
    }
    if (email.trim() === '') {
      updatedErrors.email = true;
      updatedErrorMessages.email = 'Email is required';
    }
    if (password.trim() === '') {
      updatedErrors.password = true;
      updatedErrorMessages.password = 'Password is required';
    }

    this.setState(
      { errors: updatedErrors, errorMessages: updatedErrorMessages },
      async () => {
        if (
          !updatedErrors.username &&
          !updatedErrors.email &&
          !updatedErrors.password
        ) {
          this.setState({ isLoading: true });
          const usersCollection = collection(db, 'Account');
          const usernameQuery = query(
            usersCollection,
            where('username', '==', username),
          );
          const usernameSnapshot = await getDocs(usernameQuery);
          if (!usernameSnapshot.empty) {
            this.setState({
              errorMessages: {
                ...this.state.errorMessages,
                username: 'Username is already',
              },
              errors: { ...this.state.errors, username: true },
              isLoading: false,
            });
            return;
          }
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
          );
          const user = userCredential.user;
          const hashedPassword = await hash(password, 10);
          await addDoc(usersCollection, {
            uid: user.uid,
            username,
            email,
            password: hashedPassword,
            createdAt: new Date().toISOString(),
          });
          this.props.navigation.navigate('LoginScreen');
          this.setState({ isLoading: false });
        }
      },
    );
  };

  public override render() {
    const { secureEntery, showPasswordErrors, passwordErrors, isLoading } =
      this.state;

    return (
      <ScrollView style={styles.container}>
        {isLoading && (
          <View style={styles.spinnerContainer}>
            <ActivityIndicator size='large' color={colors.secondary} />
          </View>
        )}
        {!isLoading && (
          <>
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
                  style={[styles.textInput]}
                  placeholder='Enter your Username'
                  placeholderTextColor={colors.secondary}
                  onChangeText={text =>
                    this.setState({
                      username: text,
                      errors: { ...this.state.errors, username: false },
                      errorMessages: {
                        ...this.state.errorMessages,
                        username: '',
                      },
                    })
                  }
                />
              </View>
              {this.state.errors.username && (
                <Text style={styles.errorMessage}>
                  {this.state.errorMessages.username}
                </Text>
              )}
              <View style={styles.inputContainer}>
                <Ionicons
                  name='mail-outline'
                  size={30}
                  color={colors.secondary}
                />
                <TextInput
                  style={[styles.textInput]}
                  placeholder='Enter your Email'
                  placeholderTextColor={colors.secondary}
                  keyboardType='email-address'
                  onChangeText={text =>
                    this.setState({
                      email: text,
                      errors: { ...this.state.errors, email: false },
                      errorMessages: { ...this.state.errorMessages, email: '' },
                    })
                  }
                />
              </View>
              {this.state.errors.email && (
                <Text style={styles.errorMessage}>
                  {this.state.errorMessages.email}
                </Text>
              )}
              <View style={styles.inputContainer}>
                <Ionicons
                  name='lock-closed-outline'
                  size={30}
                  color={colors.secondary}
                />
                <TextInput
                  style={[styles.textInput]}
                  placeholder='Enter your password'
                  placeholderTextColor={colors.secondary}
                  secureTextEntry={secureEntery}
                  onChangeText={text => {
                    this.handlePasswordChange(text);
                    if (text.trim() !== '') {
                      this.setState(prevState => ({
                        errors: { ...prevState.errors, password: false },
                        errorMessages: {
                          ...this.state.errorMessages,
                          password: '',
                        },
                      }));
                    }
                  }}
                />
                <TouchableOpacity onPress={this.togglePasswordVisibility}>
                  <Ionicons
                    name={secureEntery ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={colors.secondary}
                  />
                </TouchableOpacity>
              </View>
              {this.state.errors.password && (
                <Text style={styles.errorMessage}>
                  {this.state.errorMessages.password}
                </Text>
              )}
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

              <TouchableOpacity
                style={styles.loginButtonWrapper}
                onPress={this.handleSignup}
              >
                <Text style={styles.loginText}>Sign up</Text>
              </TouchableOpacity>
              {this.state.emailErrorMessage !== '' && (
                <Text style={styles.errorMessage}>
                  {this.state.emailErrorMessage}
                </Text>
              )}
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
          </>
        )}
      </ScrollView>
    );
  }
}

export default SignupScreen;
