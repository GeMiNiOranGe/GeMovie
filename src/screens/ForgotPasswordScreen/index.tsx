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
} from 'react-native';
import React from 'react';

import { colors } from '@shared/themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ForgotPasswordScreenState, RootScreenProps } from '@shared/types';
import styles from './style';

export class ForgotPassword extends React.Component<
  RootScreenProps<'ForgotPasswordScreen'>,
  ForgotPasswordScreenState
> {
  public constructor(props: RootScreenProps<'ForgotPasswordScreen'>) {
    super(props);
    this.state = {
      username: '',
      usernameErrors: false,
    };
  }
  private handleGoBack = () => {
    this.props.navigation.goBack();
  };

  private handleReset = () => {
    const { username } = this.state;
    if (username.trim() === '') {
      this.setState({ usernameErrors: true });
    } else {
      this.setState({ usernameErrors: false });
      this.props.navigation.navigate('ResetPasswordScreen');
    }
  };

  public override render() {
    const { usernameErrors } = this.state;
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
              <View style={styles.boxContainer}>
                <Text style={styles.forgotText}>Forgot Password</Text>
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
                    onChangeText={text =>
                      this.setState({
                        username: text,
                        usernameErrors: text.trim() === '',
                      })
                    }
                  />
                </View>
                {usernameErrors && (
                  <Text style={styles.errorText}>Please input Username</Text>
                )}
                <TouchableOpacity
                  style={styles.loginButtonWrapper}
                  onPress={this.handleReset}
                >
                  <Text style={styles.loginText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

export default ForgotPassword;
