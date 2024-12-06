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
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'firebase.config';
import styles from './style';

class ForgotPassword extends React.Component<
  RootScreenProps<'ForgotPasswordScreen'>,
  ForgotPasswordScreenState
> {
  public constructor(props: RootScreenProps<'ForgotPasswordScreen'>) {
    super(props);
    this.state = {
      email: '',
      emailErrors: false,
    };
  }
  private handleGoBack = () => {
    this.props.navigation.goBack();
  };

  private handleReset = async () => {
    const { email } = this.state;
    if (email.trim() === '') {
      this.setState({ emailErrors: true });
    } else {
      try {
        const queryEmail = query(
          collection(db, 'users'),
          where('email', '==', email.trim()),
        );
        const getEmail = await getDocs(queryEmail);
        if (!getEmail.empty) {
          this.setState({ emailErrors: false });
          this.props.navigation.navigate('ResetPasswordScreen', { email });
        } else {
          this.setState({ emailErrors: true });
        }
      } catch (error) {
        console.error('Error querying Firestore:', error);
        this.setState({ emailErrors: true });
      }
    }
  };

  public override render() {
    const { emailErrors } = this.state;
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
                    name='mail-outline'
                    size={30}
                    color={colors.secondary}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder='Enter your Email'
                    placeholderTextColor={colors.secondary}
                    keyboardType='email-address'
                    onChangeText={text =>
                      this.setState({
                        email: text,
                        emailErrors: text.trim() === '',
                      })
                    }
                  />
                </View>
                {emailErrors && (
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
