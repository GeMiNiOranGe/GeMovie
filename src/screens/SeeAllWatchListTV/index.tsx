import { FlatList, ListRenderItemInfo, View } from 'react-native';
import React, { Component } from 'react';

import { TvShowService } from '@services';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from 'firebase.config';
import { AuthContext } from 'src/context/AuthContext';
import {
  AuthContextProps,
  RootScreenProps,
  SeeAllWatchListTVState,
  TvShowElement,
} from '@shared/types';
import { CompactTvShowCard, FullScreenLoader } from '@components';
import styles from './style';

export class SeeAllWatchListTV extends Component<
  RootScreenProps<'SeeAllWatchListTV'>,
  SeeAllWatchListTVState
> {
  public static override contextType = AuthContext;
  public override context: AuthContextProps | null = null;
  public override state: SeeAllWatchListTVState = {
    watchListTV: [],
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
        (favorite: { type: string }) => favorite.type === 'Tv series',
      );

      if (favoriteIds) {
        const Movies = await Promise.all(
          favoriteIds.map(async ({ id }: { id: number }) =>
            TvShowService.getDetailAsync(id),
          ),
        );
        this.setState({ watchListTV: Movies, isLoading: false });
      } else {
        this.setState({ watchListTV: [], isLoading: false });
      }
    } catch (error) {
      console.error('Error fetching favorite TV:', error);
      this.setState({ isLoading: false });
    }
  };

  private renderFavoriteMovieItem = ({
    item,
    index,
  }: ListRenderItemInfo<TvShowElement>): React.JSX.Element => {
    return (
      <CompactTvShowCard
        showMediaType
        item={item}
        index={index}
        listLength={this.state.watchListTV.length}
        onPress={() =>
          this.props.navigation.navigate('TvShowDetailScreen', {
            tvShowId: item.id,
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
    const { watchListTV } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={watchListTV}
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

export default SeeAllWatchListTV;
