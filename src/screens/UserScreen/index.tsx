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
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'firebase.config';

class UserScreen extends Component<
  RootScreenProps<'UserScreen'>,
  UserScreenState
> {
  public static override contextType = AuthContext;
  public override context: AuthContextProps | null = null;

  public constructor(props: RootScreenProps<'UserScreen'>) {
    super(props);
    this.state = {
      username: '',
      isLoading: true,
    };
  }

  public override componentDidMount() {
    this.fetchUserData();
  }

  private fetchUserData = async () => {
    this.setState({ isLoading: true });
    const { email } = this.context || {};
    if (email) {
      try {
        const userQuery = query(
          collection(db, 'Account'),
          where('email', '==', email.trim()),
        );
        const querySnapshot = await getDocs(userQuery);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          const username = userData?.username || 'No username';

          this.setState({ username, isLoading: false });
        } else {
          console.log('Username not found');
          this.setState({ username: 'No username', isLoading: false });
        }
      } catch (error) {
        console.error('Error:', error);
        this.setState({
          username: 'Error fetching username',
          isLoading: false,
        });
      }
    }
  };

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
    const { username, isLoading } = this.state;
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
