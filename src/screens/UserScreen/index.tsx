import {
  ActivityIndicator,
  ListRenderItemInfo,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Component } from 'react';

import {
  AuthContextProps,
  MovieElement,
  PersonElement,
  RootScreenProps,
  TvShowElement,
  UserScreenState,
} from '@shared/types';
import { LogoutCurve, ProfileCircle } from 'iconsax-react-native';
import { colors } from '@shared/themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from 'src/context/AuthContext';
import {
  CompactMovieCard,
  CompactPersonCard,
  CompactTvShowCard,
  Section,
} from '@components';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from 'firebase.config';
import { MovieService, PersonService, TvShowService } from '@services';
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
      favoriteTvShows: [],
      favoriteMovies: [],
      favoritePerson: [],
      username: '',
      login: false,
    };
  }

  public override async componentDidMount() {
    const { isLoggedIn } = this.context || {};
    if (isLoggedIn) {
      await this.setState({ login: true });
      this.fetchFavoriteTvShows();
      this.fetchFavoriteMovie();
      this.fetchFavoritePerson();

      const userRef = doc(db, 'users', 'favorites');
      onSnapshot(userRef, this.handleFirestoreUpdate);
    }
  }

  private handleFirestoreUpdate = async () => {
    const { username } = this.context || {};
    if (username) {
      this.fetchFavoriteTvShows();
      this.fetchFavoriteMovie();
      this.fetchFavoritePerson();
    }
  };

  private fetchFavoriteTvShows = async () => {
    this.setState({ isLoading: true });
    const { isLoggedIn, username } = this.context || {};

    if (!isLoggedIn || !username) {
      this.setState({ isLoading: false });
      return;
    }

    try {
      const userRef = doc(db, 'users', 'favorites');
      const userDoc = await getDoc(userRef);
      const favoritesData = userDoc.exists()
        ? userDoc.data()?.username || {}
        : {};

      const favoriteIds = favoritesData[username]?.filter(
        (favorite: { type: string }) => favorite.type === 'tv',
      );

      if (favoriteIds) {
        const tvShows = await Promise.all(
          favoriteIds.map(async ({ id }: { id: number }) =>
            TvShowService.getDetailAsync(id),
          ),
        );
        this.setState({ favoriteTvShows: tvShows, isLoading: false });
      } else {
        this.setState({ favoriteTvShows: [], isLoading: false });
      }
    } catch (error) {
      console.error('Error fetching favorite TV shows:', error);
      this.setState({ isLoading: false });
    }
  };

  private fetchFavoriteMovie = async () => {
    this.setState({ isLoading: true });
    const { isLoggedIn, username } = this.context || {};

    if (!isLoggedIn || !username) {
      this.setState({ isLoading: false });
      return;
    }

    try {
      const userRef = doc(db, 'users', 'favorites');
      const userDoc = await getDoc(userRef);
      const favoritesData = userDoc.exists()
        ? userDoc.data()?.username || {}
        : {};

      const favoriteIds = favoritesData[username]?.filter(
        (favorite: { type: string }) => favorite.type === 'movie',
      );

      if (favoriteIds) {
        const Movies = await Promise.all(
          favoriteIds.map(async ({ id }: { id: number }) =>
            MovieService.getDetailAsync(id),
          ),
        );
        this.setState({ favoriteMovies: Movies, isLoading: false });
      } else {
        this.setState({ favoriteMovies: [], isLoading: false });
      }
    } catch (error) {
      console.error('Error fetching favorite Movies:', error);
      this.setState({ isLoading: false });
    }
  };

  private fetchFavoritePerson = async () => {
    this.setState({ isLoading: true });
    const { isLoggedIn, username } = this.context || {};

    if (!isLoggedIn || !username) {
      this.setState({ isLoading: false });
      return;
    }

    try {
      const userRef = doc(db, 'users', 'favorites');
      const userDoc = await getDoc(userRef);
      const favoritesData = userDoc.exists()
        ? userDoc.data()?.username || {}
        : {};

      const favoriteIds = favoritesData[username]?.filter(
        (favorite: { type: string }) => favorite.type === 'person',
      );

      if (favoriteIds) {
        const People = await Promise.all(
          favoriteIds.map(async ({ id }: { id: number }) =>
            PersonService.getDetailAsync(id),
          ),
        );
        this.setState({ favoritePerson: People, isLoading: false });
      } else {
        this.setState({ favoritePerson: [], isLoading: false });
      }
    } catch (error) {
      console.error('Error fetching favorite People:', error);
      this.setState({ isLoading: false });
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

  private renderFavoriteTvShowItem = ({
    item,
    index,
  }: ListRenderItemInfo<TvShowElement>): React.JSX.Element => {
    return (
      <CompactTvShowCard
        item={item}
        index={index}
        listLength={this.state.favoriteTvShows.length}
        onPress={() =>
          this.props.navigation.navigate('TvShowDetailScreen', {
            tvShowId: item.id,
          })
        }
      />
    );
  };

  private renderFavoriteMovieItem = ({
    item,
    index,
  }: ListRenderItemInfo<MovieElement>): React.JSX.Element => {
    return (
      <CompactMovieCard
        item={item}
        index={index}
        listLength={this.state.favoriteTvShows.length}
        onPress={() =>
          this.props.navigation.navigate('MovieDetailScreen', {
            movieId: item.id,
          })
        }
      />
    );
  };

  private renderFavoritePersonItem = ({
    item,
    index,
  }: ListRenderItemInfo<PersonElement>): React.JSX.Element => {
    return (
      <CompactPersonCard
        item={item}
        index={index}
        listLength={this.state.favoritePerson.length}
        onPress={() =>
          this.props.navigation.navigate('PersonDetailScreen', {
            personId: item.id,
          })
        }
      />
    );
  };

  public override render() {
    const { isLoading, favoriteTvShows, favoriteMovies, favoritePerson } =
      this.state;
    const { username } = this.context || {};

    return (
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
          <Section title='Favorite TV Shows'>
            {isLoading ? (
              <ActivityIndicator size='large' color={colors.secondary} />
            ) : favoriteTvShows.length > 0 ? (
              <Section.HorizontalList
                keyExtractor={item => item.id.toString()}
                data={favoriteTvShows}
                renderItem={this.renderFavoriteTvShowItem}
              />
            ) : (
              <Text style={styles.errorText}>No favorite TV found</Text>
            )}
          </Section>

          <Section title='Favorite Movies'>
            {isLoading ? (
              <ActivityIndicator size='large' color={colors.secondary} />
            ) : favoriteTvShows.length > 0 ? (
              <Section.HorizontalList
                keyExtractor={item => item.id.toString()}
                data={favoriteMovies}
                renderItem={this.renderFavoriteMovieItem}
              />
            ) : (
              <Text style={styles.errorText}>No favorite Movies found</Text>
            )}
          </Section>

          <Section title='Favorite Celebrities'>
            {isLoading ? (
              <ActivityIndicator size='large' color={colors.secondary} />
            ) : favoriteTvShows.length > 0 ? (
              <Section.HorizontalList
                keyExtractor={item => item.id.toString()}
                data={favoritePerson}
                renderItem={this.renderFavoritePersonItem}
              />
            ) : (
              <Text style={styles.errorText}>
                No favorite Celebrities found
              </Text>
            )}
          </Section>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.buttonLogout}
            onPress={this.handleLogout}
          >
            <LogoutCurve size={25} color='red' />
            <Text style={styles.textLogout}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default UserScreen;
