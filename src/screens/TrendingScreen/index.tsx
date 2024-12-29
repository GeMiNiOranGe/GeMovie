import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ListRenderItemInfo,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {
  TrendScreenState,
  RootScreenProps,
  MultiMediaElement,
} from '@shared/types';
import {
  isMovieElement,
  isPersonElement,
  isTvShowElement,
  toMultiMediaElement,
} from '@shared/utils';
import {
  CompactMovieCard,
  CompactPersonCard,
  CompactTvShowCard,
  FullScreenLoader,
} from '@components';
import { MediaService } from '@services';
import styles from './style';

class TrendingScreen extends React.Component<
  RootScreenProps<'TrendingScreen'>,
  TrendScreenState
> {
  public constructor(props: RootScreenProps<'TrendingScreen'>) {
    super(props);
    this.state = {
      trend: [],
      isLoading: true,
      backgroundImage: undefined,
      selectedCategory: 'all',
    };
  }

  public override async componentDidMount(): Promise<void> {
    try {
      const trendData = await MediaService.getTrendingAsync(
        'all',
        'day',
        toMultiMediaElement,
      );
      this.setState({
        trend: trendData.getResults(),
        isLoading: false,
      });
    } catch (error) {
      console.error('Error fetching trending data:', error);
      this.setState({ isLoading: false });
    }
  }

  private renderTrendingItem = ({
    item,
    index,
  }: ListRenderItemInfo<MultiMediaElement>): React.JSX.Element => {
    if (isMovieElement(item)) {
      return (
        <View style={styles.cardSpacing}>
          <CompactMovieCard
            horizontal
            showWatchList
            showRank
            showMediaType
            item={item}
            index={index}
            listLength={this.state.trend.length}
            onPress={() =>
              this.props.navigation.navigate('MovieDetailScreen', {
                movieId: item.id,
              })
            }
          />
        </View>
      );
    }

    if (isTvShowElement(item)) {
      return (
        <View style={styles.cardSpacing}>
          <CompactTvShowCard
            horizontal
            showWatchList
            showRank
            showMediaType
            item={item}
            index={index}
            listLength={this.state.trend.length}
            onPress={() =>
              this.props.navigation.navigate('TvShowDetailScreen', {
                tvShowId: item.id,
              })
            }
          />
        </View>
      );
    }

    if (isPersonElement(item)) {
      return (
        <View style={styles.cardSpacing}>
          <CompactPersonCard
            horizontal
            item={item}
            index={index}
            listLength={this.state.trend.length}
            onPress={() =>
              this.props.navigation.navigate('PersonDetailScreen', {
                personId: item.id,
              })
            }
          />
        </View>
      );
    }
    return <Text style={styles.textCategory}>No matching element</Text>;
  };

  private handleCategory = (
    category: 'all' | 'movie' | 'tv' | 'person',
  ): void => {
    this.setState({ selectedCategory: category });
  };

  public override render(): React.JSX.Element {
    const { isLoading, trend, selectedCategory } = this.state;

    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <FullScreenLoader />
        </View>
      );
    }

    const filterData =
      selectedCategory === 'all'
        ? trend
        : trend.filter(item => item.mediaType === selectedCategory);

    return (
      <LinearGradient
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={['#FFFFFF', '#FFFFFF']}
      >
        <View style={styles.category}>
          <TouchableOpacity
            style={styles.btnCategory}
            onPress={() => this.handleCategory('all')}
          >
            <Text
              style={[
                selectedCategory === 'all'
                  ? styles.btnActive
                  : styles.textCategory,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnCategory}
            onPress={() => this.handleCategory('movie')}
          >
            <Text
              style={[
                selectedCategory === 'movie'
                  ? styles.btnActive
                  : styles.textCategory,
              ]}
            >
              Movies
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnCategory}
            onPress={() => this.handleCategory('tv')}
          >
            <Text
              style={[
                selectedCategory === 'tv'
                  ? styles.btnActive
                  : styles.textCategory,
              ]}
            >
              TV
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnCategory}
            onPress={() => this.handleCategory('person')}
          >
            <Text
              style={[
                selectedCategory === 'person'
                  ? styles.btnActive
                  : styles.textCategory,
              ]}
            >
              Person
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          contentContainerStyle={styles.contentList}
          keyExtractor={item => item.id.toString()}
          data={filterData}
          renderItem={this.renderTrendingItem}
        />
      </LinearGradient>
    );
  }
}

export default TrendingScreen;
