import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';

import {
  AuthContextProps,
  RootScreenProps,
  UserScreenState,
} from '@shared/types';
import { LogoutCurve, ProfileCircle } from 'iconsax-react-native';
import { Section } from '@components';
import { colors } from '@shared/themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from 'src/context/AuthContext';
import styles from './style';

class UserScreen extends Component<
  RootScreenProps<'UserScreen'>,
  UserScreenState
> {
  public static override contextType = AuthContext;
  public override context: AuthContextProps | null = null;

  public constructor(props: RootScreenProps<'UserScreen'>) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  private handleGoBack = () => {
    this.props.navigation.navigate('HomeStack', { screen: 'HomeScreen' });
  };

  private handleLogout = () => {
    const { logout } = this.context || {};
    if (logout) {
      logout();
    }

    this.props.navigation.reset({
      index: 0,
      routes: [{ name: 'UserStack', params: { screen: 'LoginScreen' } }],
    });
  };

  public override render() {
    const { isLoading } = this.state;
    const { username } = this.context || {};
    return (
      <View style={styles.container}>
        <View style={styles.head}>
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
          <View style={styles.profileHeader}>
            <ProfileCircle size={60} />
            {isLoading ? (
              <ActivityIndicator size='large' color={colors.secondary} />
            ) : (
              <Text style={styles.textProfile}>{username}</Text>
            )}
          </View>
        </View>
        <Section.Separator />
        <View style={styles.body}>
          <Section title='Favorite Movies' />
          <Section title='Favorite TvShows' />
          <Section title='Favorite Collections' />
        </View>
        <Section.Separator />
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.buttonLogout}
            onPress={this.handleLogout}
          >
            <LogoutCurve size={25} color='red' />
            <Text style={styles.textLogout}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default UserScreen;
