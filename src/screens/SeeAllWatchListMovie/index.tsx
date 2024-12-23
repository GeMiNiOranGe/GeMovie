import { FlatList, ListRenderItemInfo, View } from 'react-native';
import React, { Component } from 'react';

import { MovieService } from '@services';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from 'firebase.config';
import { AuthContext } from 'src/context/AuthContext';
import {
  AuthContextProps,
  MovieElement,
  RootScreenProps,
  SeeAllWatchListMovieState,
} from '@shared/types';
import { CompactMovieCard, FullScreenLoader } from '@components';
import styles from './style';

export class SeeAllWatchListMovie extends Component<
  RootScreenProps<'SeeAllWatchListMovie'>,
  SeeAllWatchListMovieState
> {
  public static override contextType = AuthContext;
  public override context: AuthContextProps | null = null;
  public override state: SeeAllWatchListMovieState = {
    watchListMovies: [],
    isLoading: true,
  };

  public override async componentDidMount() {
    const { isLoggedIn } = this.context || {};
    if (isLoggedIn) {
      await this.fetchFavoriteMovie();

      const userRef = doc(db, 'users', 'watchlist');
      onSnapshot(userRef, this.fetchFavoriteMovie);
    }
  }

  private fetchFavoriteMovie = async () => {
    const { isLoggedIn, username } = this.context || {};

    if (!isLoggedIn || !username) {
      this.setState({ isLoading: false });
      return;
    }

    try {
      const userRef = doc(db, 'users', 'watchlist');
      const userDoc = await getDoc(userRef);
      const favoritesData = userDoc.exists()
        ? userDoc.data()?.username || {}
        : {};

      const favoriteIds = favoritesData[username]?.filter(
        (favorite: { type: string }) => favorite.type === 'Movie',
      );

      if (favoriteIds) {
        const Movies = await Promise.all(
          favoriteIds.map(async ({ id }: { id: number }) =>
            MovieService.getDetailAsync(id),
          ),
        );
        this.setState({ watchListMovies: Movies, isLoading: false });
      } else {
        this.setState({ watchListMovies: [], isLoading: false });
      }
    } catch (error) {
      console.error('Error fetching favorite Movies:', error);
      this.setState({ isLoading: false });
    }
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
        listLength={this.state.watchListMovies.length}
        onPress={() =>
          this.props.navigation.navigate('MovieDetailScreen', {
            movieId: item.id,
          })
        }
      />
    );
  };

  public override render() {
    if (!this.state) {
      return <FullScreenLoader />;
    }

    if (this.state.isLoading) {
      return <FullScreenLoader />;
    }
    const { watchListMovies } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={watchListMovies}
          renderItem={this.renderFavoriteMovieItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.movieCard}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

export default SeeAllWatchListMovie;
