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
import { LoginScreenState, RootScreenProps } from '@shared/types';
import { auth } from 'firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import styles from './style';

class LoginScreen extends React.Component<
  RootScreenProps<'LoginScreen'>,
  LoginScreenState
> {
  public constructor(props: RootScreenProps<'LoginScreen'>) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      secureEntery: true,
      isLoading: false,
      errors: {
        email: false,
        password: false,
      },
      errorMessages: {
        email: '',
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
    const { email, password, errorMessages, errors } = this.state;

    let updatedErrors = { ...errors };
    let updatedErrorMessages = { ...errorMessages };

    updatedErrorMessages.email = '';
    updatedErrorMessages.password = '';

    if (email.trim() === '') {
      updatedErrors.email = true;
      updatedErrorMessages.email = 'Email is required';
    }
    if (password.trim() === '') {
      updatedErrors.password = true;
      updatedErrorMessages.password = 'Password is required';
    }

    if (updatedErrorMessages.email || updatedErrorMessages.password) {
      this.setState({
        errors: updatedErrors,
        errorMessages: updatedErrorMessages,
      });
      return;
    }

    this.setState({ isLoading: true });

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful');
      this.props.navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Login failed:', error);
      this.setState({
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
            <Ionicons name='mail-outline' size={30} color={colors.secondary} />
            <TextInput
              style={styles.textInput}
              placeholder='Enter your Email'
              placeholderTextColor={colors.secondary}
              autoCapitalize='none'
              keyboardType='email-address'
              value={this.state.email}
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
