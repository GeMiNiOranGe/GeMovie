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
import styles from './style';

class LoginScreen extends React.Component<
  RootScreenProps<'LoginScreen'>,
  LoginScreenState
> {
  public constructor(props: RootScreenProps<'LoginScreen'>) {
    super(props);
    this.state = {
      secureEntery: true,
      isLoading: false,
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

  private handleLogin = () => {
    console.log('Login button pressed');
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
              placeholder='Enter your email'
              placeholderTextColor={colors.secondary}
              keyboardType='email-address'
              autoCapitalize='none'
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
            />
            <TouchableOpacity onPress={this.togglePasswordVisibility}>
              <Ionicons
                name={secureEntery ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={colors.secondary}
              />
            </TouchableOpacity>
          </View>

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
