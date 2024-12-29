/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Animated,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '@shared/themes';
import { RootScreenProps, SignupScreenState } from '@shared/types';
import { collection, where, query, getDocs, addDoc } from 'firebase/firestore';
import { auth, db } from 'firebase.config';
import { hash } from 'bcrypt-ts';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import styles from './style';

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
      usernameFocus: false,
      passwordFocus: false,
      emailFocus: false,
      animatedUsername: new Animated.Value(0),
      animatedPassword: new Animated.Value(0),
      animatedEmail: new Animated.Value(0),
    };
  }

  private focusTextInput = (field: 'username' | 'password' | 'email') => {
    const isFocusedKey = `${field}Focus` as const;
    let animatedValueKey:
      | 'animatedUsername'
      | 'animatedPassword'
      | 'animatedEmail' = 'animatedUsername';
    if (field === 'username') {
      animatedValueKey;
    } else if (field === 'email') {
      animatedValueKey = 'animatedEmail';
    } else {
      animatedValueKey = 'animatedPassword';
    }

    this.setState(
      { [isFocusedKey]: true } as Pick<typeof this.state, typeof isFocusedKey>,
      () => {
        Animated.timing(this.state[animatedValueKey], {
          toValue: -25,
          duration: 200,
          useNativeDriver: false,
        }).start();
      },
    );
  };

  private blurTextInput = (field: 'username' | 'password' | 'email') => {
    const isFocusedKey = `${field}Focus` as const;
    let animatedValueKey:
      | 'animatedUsername'
      | 'animatedPassword'
      | 'animatedEmail' = 'animatedUsername';
    if (field === 'username') {
      animatedValueKey;
    } else if (field === 'email') {
      animatedValueKey = 'animatedEmail';
    } else {
      animatedValueKey = 'animatedPassword';
    }

    this.setState(
      { [isFocusedKey]: false } as Pick<typeof this.state, typeof isFocusedKey>,
      () => {
        const value = this.state[field];
        if (!value) {
          Animated.timing(this.state[animatedValueKey], {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }).start();
        }
      },
    );
  };

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
    const updatedErrors = {
      username: username.trim() === '',
      email: email.trim() === '',
      password: password.trim() === '',
    };
    const updatedErrorMessages = {
      username: updatedErrors.username ? 'Username is required' : '',
      email: updatedErrors.email ? 'Email is required' : '',
      password: updatedErrors.password ? 'Password is required' : '',
    };

    this.setState({
      errors: updatedErrors,
      errorMessages: updatedErrorMessages,
    });

    if (Object.values(updatedErrors).some(error => error)) {
      return;
    }

    try {
      this.setState({ isLoading: true });
      const usersCollection = collection(db, 'Account');
      const usernameQuery = query(
        usersCollection,
        where('username', '==', username),
      );
      const usernameSnapshot = await getDocs(usernameQuery);

      if (!usernameSnapshot.empty) {
        this.setState({
          errors: { ...errors, username: true },
          errorMessages: {
            ...errorMessages,
            username: 'Username is already taken',
          },
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
    } catch (error) {
      console.error('Error signing up:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  private getPasswordErrorMessage = (key: string): string => {
    const messages: Record<string, string> = {
      length: 'At least 8 characters',
      uppercase: 'At least 1 uppercase letter',
      lowercase: 'At least 1 lowercase letter',
      number: 'At least 1 number',
      specialChar: 'At least 1 special character (@$!%*?&#)',
    };
    return messages[key] || '';
  };

  public override render() {
    const {
      username,
      password,
      email,
      secureEntery,
      showPasswordErrors,
      passwordErrors,
      isLoading,
      usernameFocus,
      animatedUsername,
      passwordFocus,
      animatedPassword,
      emailFocus,
      animatedEmail,
    } = this.state;

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
                  color={colors.accent.dark}
                />
                {username || usernameFocus ? (
                  <Animated.Text
                    style={[
                      styles.placeholder,
                      {
                        top: animatedUsername,
                      },
                    ]}
                  >
                    Username
                  </Animated.Text>
                ) : null}
                <TextInput
                  style={[styles.textInput]}
                  autoCapitalize='none'
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
                  onFocus={() => this.focusTextInput('username')}
                  onBlur={() => this.blurTextInput('username')}
                  placeholder={!username && !usernameFocus ? 'Username' : ''}
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
                  color={colors.accent.dark}
                />
                {email || emailFocus ? (
                  <Animated.Text
                    style={[
                      styles.placeholder,
                      {
                        top: animatedEmail,
                      },
                    ]}
                  >
                    Email
                  </Animated.Text>
                ) : null}
                <TextInput
                  style={[styles.textInput]}
                  keyboardType='email-address'
                  autoCapitalize='none'
                  onChangeText={text =>
                    this.setState({
                      email: text,
                      errors: { ...this.state.errors, email: false },
                      errorMessages: { ...this.state.errorMessages, email: '' },
                    })
                  }
                  onFocus={() => this.focusTextInput('email')}
                  onBlur={() => this.blurTextInput('email')}
                  placeholder={!email && !emailFocus ? 'Email' : ''}
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
                  color={colors.accent.dark}
                />
                {password || passwordFocus ? (
                  <Animated.Text
                    style={[
                      styles.placeholder,
                      {
                        top: animatedPassword,
                      },
                    ]}
                  >
                    Password
                  </Animated.Text>
                ) : null}
                <TextInput
                  style={[styles.textInput]}
                  secureTextEntry={secureEntery}
                  autoCapitalize='none'
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
                  onFocus={() => this.focusTextInput('password')}
                  onBlur={() => this.blurTextInput('password')}
                  placeholder={!password && !passwordFocus ? 'Password' : ''}
                />
                <TouchableOpacity onPress={this.togglePasswordVisibility}>
                  <Ionicons
                    name={secureEntery ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={colors.accent.dark}
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
                  {Object.entries(passwordErrors).map(([key, isValid]) => (
                    <Text
                      key={key}
                      style={{
                        color: isValid ? 'green' : 'red',
                        ...styles.errorText,
                      }}
                    >
                      * {this.getPasswordErrorMessage(key)}
                    </Text>
                  ))}
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
