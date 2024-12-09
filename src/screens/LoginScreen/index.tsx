import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FullScreenLoader } from '@components';
import { Google } from 'iconsax-react-native';
import { colors } from '@shared/themes';
import {
  AuthContextProps,
  LoginScreenState,
  RootScreenProps,
} from '@shared/types';
import { auth, db } from 'firebase.config';
import styles from './style';
import { AuthContext } from 'src/context/AuthContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';

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
    };
  }

  private togglePasswordVisibility = () => {
    this.setState(prevState => ({
      secureEntery: !prevState.secureEntery,
    }));
  };

  private handleGoBack = () => {
    this.props.navigation.goBack();
  };

  private handleSignup = () => {
    this.props.navigation.navigate('SignupScreen');
  };

  private handleForgot = () => {
    this.props.navigation.navigate('ForgotPasswordScreen');
  };

  private handleLogin = async () => {
    const { username, password, errorMessages, errors } = this.state;
    const { login } = this.context || {};
    let updatedErrors = { ...errors };
    let updatedErrorMessages = { ...errorMessages };
    updatedErrorMessages.username = '';
    updatedErrorMessages.password = '';
    if (username.trim() === '') {
      updatedErrors.username = true;
      updatedErrorMessages.username = 'Username is required';
    }
    if (password.trim() === '') {
      updatedErrors.password = true;
      updatedErrorMessages.password = 'Password is required';
    }

    if (updatedErrorMessages.username || updatedErrorMessages.password) {
      this.setState({
        errors: updatedErrors,
        errorMessages: updatedErrorMessages,
      });
      return;
    }

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
          errorMessages: {
            ...this.state.errorMessages,
            username: 'Username does not exist',
          },
          errors: { ...this.state.errors, username: true },
          isLoading: false,
        });
        return;
      }

      const userDoc = usernameSnapshot.docs[0];
      const userData = userDoc.data();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userData.email,
        password,
      );
      if (login) {
        login(username);
      }

      this.props.navigation.navigate('HomeStack', { screen: 'HomeScreen' });
    } catch (error) {
      console.error('Login error:', error);
      this.setState({
        errorMessages: {
          ...this.state.errorMessages,
          password: 'Incorrect username or password',
        },
        errors: { ...this.state.errors, password: true },
        isLoading: false,
      });
    }
  };

  public override render() {
    const { secureEntery, isLoading } = this.state;

    if (isLoading) {
      return <FullScreenLoader />;
    }

    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
          <Text style={styles.headingText}>Hey,</Text>
          <Text style={styles.headingText}>Welcome</Text>
          <Text style={styles.headingText}>GeMovie</Text>
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
              autoCapitalize='none'
              value={this.state.username}
              onChangeText={text =>
                this.setState({
                  username: text,
                  errors: { ...this.state.errors, username: false },
                  errorMessages: { ...this.state.errorMessages, username: '' },
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
              name='lock-closed-outline'
              size={30}
              color={colors.secondary}
            />
            <TextInput
              style={styles.textInput}
              placeholder='Enter your password'
              placeholderTextColor={colors.secondary}
              secureTextEntry={secureEntery}
              onChangeText={text => {
                this.setState({
                  password: text,
                  errors: { ...this.state.errors, password: false },
                  errorMessages: { ...this.state.errorMessages, password: '' },
                });
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

          <TouchableOpacity onPress={this.handleForgot}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButtonWrapper}
            onPress={this.handleLogin}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.continueText}>or continue with</Text>
          <TouchableOpacity style={styles.googleButtonContainer}>
            <Google style={styles.googleImage} />
            <Text style={styles.googleText}>Google</Text>
          </TouchableOpacity>

          <View style={styles.footerContainer}>
            <Text style={styles.accountText}>Don’t have an account?</Text>
            <TouchableOpacity onPress={this.handleSignup}>
              <Text style={styles.signupText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default LoginScreen;
