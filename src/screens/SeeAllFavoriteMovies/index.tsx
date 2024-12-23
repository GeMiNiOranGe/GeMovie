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
  SeeAllFavoriteMoviesState,
} from '@shared/types';
import { CompactMovieCard, FullScreenLoader } from '@components';
import styles from './style';

export class SeeAllFavoriteMovie extends Component<
  RootScreenProps<'SeeAllFavoriteMovie'>,
  SeeAllFavoriteMoviesState
> {
  public static override contextType = AuthContext;
  public override context: AuthContextProps | null = null;
  public override state: SeeAllFavoriteMoviesState = {
    favoriteMovies: [],
    isLoading: true,
  };

  public override async componentDidMount() {
    const { isLoggedIn } = this.context || {};
    if (isLoggedIn) {
      await this.fetchFavoriteMovie();

      const userRef = doc(db, 'users', 'favorites');
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

  private renderFavoriteMovieItem = ({
    item,
    index,
  }: ListRenderItemInfo<MovieElement>): React.JSX.Element => {
    return (
      <CompactMovieCard
        showMediaType
        item={item}
        index={index}
        listLength={this.state.favoriteMovies.length}
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
    const { favoriteMovies } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={favoriteMovies}
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

export default SeeAllFavoriteMovie;
