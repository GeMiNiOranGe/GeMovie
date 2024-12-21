import { FlatList, ListRenderItemInfo, View } from 'react-native';
import React, { Component } from 'react';

import {
  AuthContextProps,
  MovieElement,
  PersonElement,
  RootScreenProps,
  SeeAllFavoriteState,
  TvShowElement,
} from '@shared/types';
import {
  CompactMovieCard,
  CompactPersonCard,
  CompactTvShowCard,
  FullScreenLoader,
} from '@components';
import styles from './style';
import { MovieService, PersonService, TvShowService } from '@services';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from 'firebase.config';
import { AuthContext } from 'src/context/AuthContext';

class SeeAllFavoriteScreen extends Component<
  RootScreenProps<'SeeAllFavoriteScreen'>,
  SeeAllFavoriteState
> {
  public static override contextType = AuthContext;
  public override context: AuthContextProps | null = null;

  public override state: SeeAllFavoriteState = {
    favoriteTvShows: [],
    favoriteMovies: [],
    favoritePerson: [],
    isLoading: true,
  };

  public override async componentDidMount() {
    const { isLoggedIn } = this.context || {};
    if (isLoggedIn) {
      await this.fetchFavoriteData();

      const userRef = doc(db, 'users', 'favorites');
      onSnapshot(userRef, this.fetchFavoriteData);
    }
  }

  private fetchFavoriteData = async () => {
    this.fetchFavoriteTvShows();
    this.fetchFavoriteMovie();
    this.fetchFavoritePerson();
  };

  private fetchFavoriteTvShows = async () => {
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

  public override render() {
    const { type } = this.props.route.params;

    if (!this.state) {
      return <FullScreenLoader />;
    }

    if (this.state.isLoading) {
      return <FullScreenLoader />;
    }

    const { favoriteTvShows, favoriteMovies, favoritePerson } = this.state;

    return (
      <View style={styles.container}>
        {type === 'tv' && (
          <FlatList
            data={favoriteTvShows}
            renderItem={this.renderFavoriteTvShowItem}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.movieCard}
            showsVerticalScrollIndicator={false}
          />
        )}

        {type === 'movie' && (
          <FlatList
            data={favoriteMovies}
            renderItem={this.renderFavoriteMovieItem}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.movieCard}
            showsVerticalScrollIndicator={false}
          />
        )}

        {type === 'person' && (
          <FlatList
            data={favoritePerson}
            renderItem={this.renderFavoritePersonItem}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.movieCard}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    );
  }
}

export default SeeAllFavoriteScreen;
