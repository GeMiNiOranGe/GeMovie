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
    const { secureEntery, isLoading, errors, errorMessages } = this.state;

    if (isLoading) {
      return <FullScreenLoader />;
    }

    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Back Button */}
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
                  errors: { ...errors, username: false },
                  errorMessages: { ...errorMessages, username: '' },
                })
              }
            />
          </View>
          {errors.username && (
            <Text style={styles.errorMessage}>{errorMessages.username}</Text>
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
              autoCapitalize='none'
              onChangeText={text =>
                this.setState({
                  password: text,
                  errors: { ...errors, password: false },
                  errorMessages: { ...errorMessages, password: '' },
                })
              }
            />
            <TouchableOpacity onPress={this.togglePasswordVisibility}>
              <Ionicons
                name={secureEntery ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={colors.secondary}
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

          <Text style={styles.continueText}>or continue with</Text>
          <TouchableOpacity style={styles.googleButtonContainer}>
            <Google style={styles.googleImage} />
            <Text style={styles.googleText}>Google</Text>
          </TouchableOpacity>

          <View style={styles.footerContainer}>
            <Text style={styles.accountText}>Don’t have an account?</Text>
            <TouchableOpacity
              onPress={() => this.handleNavigation('SignupScreen')}
            >
              <Text style={styles.signupText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default LoginScreen;
