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
  LabelProps,
  MovieElement,
  PersonElement,
  RootScreenProps,
  TvShowElement,
  UserScreenState,
} from '@shared/types';
import {
  Bookmark,
  Heart,
  LogoutCurve,
  ProfileCircle,
} from 'iconsax-react-native';
import { colors, layout } from '@shared/themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from 'src/context/AuthContext';
import {
  CompactMovieCard,
  CompactPersonCard,
  CompactTvShowCard,
  Labels,
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
      watchListMovies: [],
      watchListTvShows: [],
      username: '',
      login: false,
    };
  }

  public override async componentDidMount(): Promise<void> {
    const { isLoggedIn } = this.context || {};
    if (isLoggedIn) {
      await this.setState({ login: true });
      this.fetchFavoriteTvShows();
      this.fetchFavoriteMovie();
      this.fetchFavoritePerson();
      this.fetchWatchListMovies();
      this.fetchWatchListTv();

      const userRef = doc(db, 'users', 'favorites');
      onSnapshot(userRef, this.handleUpdateFavorites);

      const watchlistRef = doc(db, 'users', 'watchlist');
      onSnapshot(watchlistRef, this.handleUpdateWatchlist);
    }
  }

  private handleUpdateFavorites = async (): Promise<void> => {
    const { username } = this.context || {};
    if (username) {
      this.fetchFavoriteTvShows();
      this.fetchFavoriteMovie();
      this.fetchFavoritePerson();
    }
  };

  private handleUpdateWatchlist = async (): Promise<void> => {
    const { username } = this.context || {};
    if (username) {
      await this.fetchWatchListMovies();
      await this.fetchWatchListTv();
    }
  };

  private fetchWatchListMovies = async (): Promise<void> => {
    this.setState({ isLoading: true });
    const { isLoggedIn, username } = this.context || {};

    if (!isLoggedIn || !username) {
      this.setState({ isLoading: false });
      return;
    }

    try {
      const userRef = doc(db, 'users', 'watchlist');
      const userDoc = await getDoc(userRef);
      const watchlistData = userDoc.exists()
        ? userDoc.data()?.username || {}
        : {};

      const watchlistIds = watchlistData[username]?.filter(
        (watchlist: { type: string }) => watchlist.type === 'Movie',
      );

      if (watchlistIds) {
        const Movies = await Promise.all(
          watchlistIds.map(async ({ id }: { id: number }) =>
            MovieService.getDetailAsync(id),
          ),
        );
        this.setState({ watchListMovies: Movies, isLoading: false });
      } else {
        this.setState({ watchListMovies: [], isLoading: false });
      }
    } catch (error) {
      console.error('Error fetching watchlist Movies:', error);
      this.setState({ isLoading: false });
    }
  };

  private fetchWatchListTv = async (): Promise<void> => {
    this.setState({ isLoading: true });
    const { isLoggedIn, username } = this.context || {};

    if (!isLoggedIn || !username) {
      this.setState({ isLoading: false });
      return;
    }

    try {
      const userRef = doc(db, 'users', 'watchlist');
      const userDoc = await getDoc(userRef);
      const watchlistData = userDoc.exists()
        ? userDoc.data()?.username || {}
        : {};

      const watchlistIds = watchlistData[username]?.filter(
        (watchlist: { type: string }) => watchlist.type === 'Tv series',
      );

      if (watchlistIds) {
        const tvShows = await Promise.all(
          watchlistIds.map(async ({ id }: { id: number }) =>
            TvShowService.getDetailAsync(id),
          ),
        );
        this.setState({ watchListTvShows: tvShows, isLoading: false });
      } else {
        this.setState({ watchListTvShows: [], isLoading: false });
      }
    } catch (error) {
      console.error('Error fetching watchlist TV shows:', error);
      this.setState({ isLoading: false });
    }
  };

  private fetchFavoriteTvShows = async (): Promise<void> => {
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

  private fetchFavoriteMovie = async (): Promise<void> => {
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

  private fetchFavoritePerson = async (): Promise<void> => {
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

  private handleGoBack = (): void => {
    this.props.navigation.navigate('HomeStack', { screen: 'HomeScreen' });
  };

  private handleLogout = (): void => {
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
        showMediaType
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
        showMediaType
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

  private renderWatchlistTvShowItem = ({
    item,
    index,
  }: ListRenderItemInfo<TvShowElement>): React.JSX.Element => {
    return (
      <CompactTvShowCard
        showMediaType
        showWatchList
        item={item}
        index={index}
        listLength={this.state.watchListTvShows.length}
        onPress={() =>
          this.props.navigation.navigate('TvShowDetailScreen', {
            tvShowId: item.id,
          })
        }
      />
    );
  };

  private renderWatchlistMovieItem = ({
    item,
    index,
  }: ListRenderItemInfo<MovieElement>): React.JSX.Element => {
    return (
      <CompactMovieCard
        showMediaType
        showWatchList
        item={item}
        index={index}
        listLength={this.state.watchListMovies.length}
        onPress={() =>
          this.props.navigation.navigate('MovieDetailScreen', {
            movieId: item.id,
          })
        }
      />
    );
  };

  private getLabels(): LabelProps[] {
    return [
      {
        icon: <Heart size={15} color={colors.accent.dark.toString()} />,
        name: 'Favorite Movies',
        value: this.state.favoriteMovies.length.toString(),
      },
      {
        icon: <Heart size={15} color={colors.accent.dark.toString()} />,
        name: 'Favorite TV',
        value: this.state.favoriteTvShows.length.toString(),
      },
      {
        icon: <Heart size={15} color={colors.accent.dark.toString()} />,
        name: 'Favorite People',
        value: this.state.favoritePerson.length.toString(),
      },
      {
        icon: <Bookmark size={15} color={colors.accent.dark.toString()} />,
        name: 'Watchlist Movies',
        value: this.state.watchListMovies.length.toString(),
      },
      {
        icon: <Bookmark size={15} color={colors.accent.dark.toString()} />,
        name: 'Watchlist TV',
        value: this.state.watchListTvShows.length.toString(),
      },
    ];
  }

  public override render(): React.JSX.Element {
    const {
      isLoading,
      favoriteTvShows,
      favoriteMovies,
      favoritePerson,
      watchListMovies,
      watchListTvShows,
    } = this.state;
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
          <View style={[layout.itemsCenter]}>
            <Labels data={this.getLabels()} />
          </View>
        </View>
        <Section.Separator />

        <View style={styles.body}>
          <Section
            title='Watchlist TV Shows'
            moreButtonText='See all'
            onMoreButtonPress={() =>
              this.props.navigation.navigate('SeeAllWatchListTV')
            }
          >
            {isLoading ? (
              <ActivityIndicator size='large' color={colors.secondary} />
            ) : watchListTvShows.length > 0 ? (
              <Section.HorizontalList
                keyExtractor={item => item.id.toString()}
                data={watchListTvShows}
                renderItem={this.renderWatchlistTvShowItem}
              />
            ) : (
              <Text style={styles.errorText}>No watchlist TV found</Text>
            )}
          </Section>

          <Section.Separator />

          <Section
            title='Watchlist Movies'
            moreButtonText='See all'
            onMoreButtonPress={() =>
              this.props.navigation.navigate('SeeAllWatchListTV')
            }
          >
            {isLoading ? (
              <ActivityIndicator size='large' color={colors.secondary} />
            ) : watchListMovies.length > 0 ? (
              <Section.HorizontalList
                keyExtractor={item => item.id.toString()}
                data={watchListMovies}
                renderItem={this.renderWatchlistMovieItem}
              />
            ) : (
              <Text style={styles.errorText}>No watchlist Movies found</Text>
            )}
          </Section>
          <Section.Separator />

          <Section
            title='Favorite TV Shows'
            moreButtonText='See all'
            onMoreButtonPress={() => {
              this.props.navigation.navigate('SeeAllFavoriteTV');
            }}
          >
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

          <Section.Separator />

          <Section
            title='Favorite Movies'
            moreButtonText='See all'
            onMoreButtonPress={() => {
              this.props.navigation.navigate('SeeAllFavoriteMovie');
            }}
          >
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

          <Section.Separator />

          <Section
            title='Favorite Celebrities'
            moreButtonText='See all'
            onMoreButtonPress={() => {
              this.props.navigation.navigate('SeeAllFavoritePerson');
            }}
          >
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

          <Section.Separator />
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
