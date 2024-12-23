import { FlatList, ListRenderItemInfo, View } from 'react-native';
import React, { Component } from 'react';

import { TvShowService } from '@services';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from 'firebase.config';
import { AuthContext } from 'src/context/AuthContext';
import {
  AuthContextProps,
  RootScreenProps,
  SeeAllFavoriteTVState,
  TvShowElement,
} from '@shared/types';
import { CompactTvShowCard, FullScreenLoader } from '@components';
import styles from './style';

export class SeeAllFavoriteTV extends Component<
  RootScreenProps<'SeeAllFavoriteTV'>,
  SeeAllFavoriteTVState
> {
  public static override contextType = AuthContext;
  public override context: AuthContextProps | null = null;
  public override state: SeeAllFavoriteTVState = {
    favoriteTvShows: [],
    isLoading: true,
  };

  public override async componentDidMount() {
    const { isLoggedIn } = this.context || {};
    if (isLoggedIn) {
      await this.fetchFavoriteTV();

      const userRef = doc(db, 'users', 'favorites');
      onSnapshot(userRef, this.fetchFavoriteTV);
    }
  }

  private fetchFavoriteTV = async () => {
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
        const Movies = await Promise.all(
          favoriteIds.map(async ({ id }: { id: number }) =>
            TvShowService.getDetailAsync(id),
          ),
        );
        this.setState({ favoriteTvShows: Movies, isLoading: false });
      } else {
        this.setState({ favoriteTvShows: [], isLoading: false });
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
        listLength={this.state.favoriteTvShows.length}
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
    const { favoriteTvShows } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={favoriteTvShows}
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

export default SeeAllFavoriteTV;
