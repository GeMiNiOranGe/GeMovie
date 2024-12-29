/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, FlatList, ListRenderItemInfo } from 'react-native';

import { VideoService } from '@services';
import type {
  RootScreenProps,
  SeeAllTVState,
  TvShowElement,
} from '@shared/types';
import { toTvShowElement } from '@shared/utils';
import { CompactTvShowCard, FullScreenLoader } from '@components';
import styles from './style';

class AllTV extends React.Component<
  RootScreenProps<'SeeAllTV'>,
  SeeAllTVState
> {
  public constructor(props: RootScreenProps<'SeeAllTV'>) {
    super(props);
    this.state = {
      tv: [],
      isLoading: true,
    };
  }

  public override componentDidMount(): void {
    try {
      const getTv = VideoService.getPopularListAsync('tv', toTvShowElement);
      getTv.then(tv => {
        this.setState({ tv: tv.getResults(), isLoading: false });
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ isLoading: false });
    }
  }

  private renderPopularMovieItem({
    item,
    index,
  }: ListRenderItemInfo<TvShowElement>): React.JSX.Element {
    return (
      <CompactTvShowCard
        showWatchList
        item={item}
        index={index}
        listLength={this.state.tv.length}
        onPress={() =>
          this.props.navigation.navigate('TvShowDetailScreen', {
            tvShowId: item.id,
          })
        }
      />
    );
  }

  public override render(): React.JSX.Element {
    if (this.state.isLoading) {
      return <FullScreenLoader />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.movieList}>
          <FlatList
            data={this.state.tv}
            renderItem={this.renderPopularMovieItem.bind(this)}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.movieCard}
            contentContainerStyle={{
              paddingHorizontal: 20,
            }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
}

export default AllTV;
