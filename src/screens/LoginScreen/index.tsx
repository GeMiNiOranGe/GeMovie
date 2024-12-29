import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FullScreenLoader } from '@components';
import { colors } from '@shared/themes';
import {
  AuthContextProps,
  LoginScreenState,
  RootScreenProps,
} from '@shared/types';
import { auth, db } from 'firebase.config';
import { AuthContext } from 'src/context/AuthContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import styles from './style';

class LoginScreen extends React.Component<
  RootScreenProps<'LoginScreen'>,
  LoginScreenState
> {
  public static override contextType = AuthContext;
  public override context: AuthContextProps | null = null;

  public constructor(props: RootScreenProps<'LoginScreen'>) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      secureEntery: true,
      isLoading: false,
      errors: {
        username: false,
        password: false,
      },
      errorMessages: {
        username: '',
        password: '',
      },
      usernameFocus: false,
      passwordFocus: false,
      animatedUsername: new Animated.Value(0),
      animatedPassword: new Animated.Value(0),
    };
  }

  private focusTextInput = (field: 'username' | 'password') => {
    const isFocusedKey = `${field}Focus` as const;
    const animatedValueKey =
      field === 'username' ? 'animatedUsername' : 'animatedPassword';

    this.setState(
      { [isFocusedKey]: true } as Pick<typeof this.state, typeof isFocusedKey>,
      () => {
        Animated.timing(this.state[animatedValueKey], {
          toValue: -29,
          duration: 200,
          useNativeDriver: false,
        }).start();
      },
    );
  };

  private blurTextInput = (field: 'username' | 'password') => {
    const isFocusedKey = `${field}Focus` as const;
    const animatedValueKey =
      field === 'username' ? 'animatedUsername' : 'animatedPassword';

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

  private handleNavigation = (screen: string) => {
    this.props.navigation.navigate(screen);
  };

  private validateInputs = (): boolean => {
    const { username, password } = this.state;
    const errors = {
      username: username.trim() === '',
      password: password.trim() === '',
    };
    const errorMessages = {
      username: errors.username ? 'Username is required' : '',
      password: errors.password ? 'Password is required' : '',
    };

    this.setState({ errors, errorMessages });
    return !errors.username && !errors.password;
  };

  private handleLogin = async () => {
    if (!this.validateInputs()) {
      return;
    }

    const { username, password } = this.state;
    const { login } = this.context || {};
    this.setState({ isLoading: true });

    try {
      const loginCollection = collection(db, 'Account');
      const usernameQuery = query(
        loginCollection,
        where('username', '==', username),
      );
      const usernameSnapshot = await getDocs(usernameQuery);

      if (usernameSnapshot.empty) {
        this.setState({
          errors: { ...this.state.errors, username: true },
          errorMessages: {
            ...this.state.errorMessages,
            username: 'Username does not exist',
          },
          isLoading: false,
        });
        return;
      }
      const userDoc = usernameSnapshot.docs[0];
      const userData = userDoc.data();
      await signInWithEmailAndPassword(auth, userData.email, password);

      if (login) {
        login(username);
      }

      this.handleNavigation('HomeStack');
    } catch (error) {
      this.setState({
        errors: { ...this.state.errors, password: true },
        errorMessages: {
          ...this.state.errorMessages,
          password: 'Incorrect username or password',
        },
        isLoading: false,
      });
    }
  };

  public override render() {
    const {
      username,
      password,
      secureEntery,
      isLoading,
      errors,
      errorMessages,
      animatedUsername,
      animatedPassword,
      usernameFocus,
      passwordFocus,
    } = this.state;

    if (isLoading) {
      return <FullScreenLoader />;
    }

    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.backButtonWrapper}
          onPress={() => this.props.navigation.goBack()}
        >
          <Ionicons
            name='arrow-back-outline'
            color={colors.primary}
            size={25}
          />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={styles.headingText}>Welcome</Text>
          <Text style={styles.headingText}>GeMovie</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Ionicons
              name='person-outline'
              size={30}
              color={colors.accent.dark}
            />
            <View style={styles.containerplaceholder}>
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
                style={styles.textInput}
                value={username}
                onFocus={() => this.focusTextInput('username')}
                onBlur={() => this.blurTextInput('username')}
                onChangeText={text => this.setState({ username: text })}
                placeholder={!username && !usernameFocus ? 'Username' : ''}
              />
            </View>
          </View>
          {errors.username && (
            <Text style={styles.errorMessage}>{errorMessages.username}</Text>
          )}

          <View style={styles.inputContainer}>
            <Ionicons
              name='lock-closed-outline'
              size={30}
              color={colors.accent.dark}
            />
            <View style={styles.containerplaceholder}>
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
                style={styles.textInput}
                secureTextEntry={secureEntery}
                value={password}
                onFocus={() => this.focusTextInput('password')}
                onBlur={() => this.blurTextInput('password')}
                onChangeText={text => this.setState({ password: text })}
                placeholder={!password && !passwordFocus ? 'Password' : ''}
              />
            </View>
            <TouchableOpacity onPress={this.togglePasswordVisibility}>
              <Ionicons
                name={secureEntery ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={colors.accent.dark}
              />
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text style={styles.errorMessage}>{errorMessages.password}</Text>
          )}

          <TouchableOpacity
            onPress={() => this.handleNavigation('ForgotPasswordScreen')}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButtonWrapper}
            onPress={this.handleLogin}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.footerContainer}>
            <Text style={styles.accountText}>Don’t have an account?</Text>
            <TouchableOpacity
              onPress={() => this.handleNavigation('SignupScreen')}
            >
              <Text style={styles.signupText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default LoginScreen;
