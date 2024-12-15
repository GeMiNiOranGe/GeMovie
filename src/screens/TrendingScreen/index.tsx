import {
  View,
  ActivityIndicator,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import { TMDB_API_KEY, TMDB_BASE_URL } from '@config';
import {
  TrendScreenState,
  FeaturedMovie,
  FeaturedTvShow,
  RootScreenProps,
} from '@shared/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MasonryFlashList } from '@shopify/flash-list';
import { URLBuilder } from '@services';
import { getRandomHeight } from '@shared/utils';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';

class TrendingScreen extends React.Component<
  RootScreenProps<'TrendingScreen'>,
  TrendScreenState
> {
  private intervalId: NodeJS.Timeout | null = null;

  public constructor(props: RootScreenProps<'TrendingScreen'>) {
    super(props);
    this.state = {
      trendingMovies: [],
      trendingTvShows: [],
      isLoading: true,
      backgroundImage: undefined,
      selectedCategory: 'movie',
    };
  }

  public override componentDidMount(): void {
    const trendUrl = `${TMDB_BASE_URL}/trending/all/day?api_key=${TMDB_API_KEY}&language=en-US`;
    fetch(trendUrl)
      .then(response => response.json())
      .then(trendData => {
        const trendingMovies = trendData.results.filter(
          (item: FeaturedMovie) => item.media_type === 'movie',
        );
        const trendingTvShows = trendData.results.filter(
          (item: FeaturedTvShow) => item.media_type === 'tv',
        );

        this.setState({
          trendingMovies,
          trendingTvShows,
          isLoading: false,
        });
      })
      .catch(error => {
        console.error('Error fetching trending data:', error);
        this.setState({ isLoading: false });
      });
  }

  public override componentWillUnmount(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  public renderMovieItem = ({
    item,
  }: {
    item: FeaturedMovie;
  }): React.JSX.Element => {
    const imageUrl = URLBuilder.buildImageURL('w500', item.poster_path);
    return (
      <TouchableOpacity
        style={[styles.movieItem, { height: getRandomHeight(150, 300) }]}
        onPress={() =>
          this.props.navigation.navigate('MovieDetailScreen', {
            movieId: item.id,
          })
        }
      >
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.movieThumbnail} />
        ) : (
          <Icon
            name='film'
            size={60}
            color='black'
            style={styles.movieThumbnail}
          />
        )}
      </TouchableOpacity>
    );
  };

  public renderTvShowItem = ({
    item,
  }: {
    item: FeaturedTvShow;
  }): React.JSX.Element => {
    const imageUrl = URLBuilder.buildImageURL('w500', item.poster_path);
    return (
      <TouchableOpacity
        style={[styles.movieItem, { height: getRandomHeight(150, 300) }]}
        onPress={() =>
          this.props.navigation.navigate('TvShowDetailScreen', {
            tvShowId: item.id,
          })
        }
      >
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.movieThumbnail} />
        ) : (
          <Icon
            name='film'
            size={60}
            color='black'
            style={styles.movieThumbnail}
          />
        )}
        <Text style={styles.movieTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  public getRandomTrendingItem = (): FeaturedMovie | FeaturedTvShow | null => {
    const { trendingMovies, trendingTvShows } = this.state;
    const combined: (FeaturedMovie | FeaturedTvShow)[] = [
      ...trendingMovies,
      ...trendingTvShows,
    ];

    if (combined.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * combined.length);
    return combined[randomIndex];
  };

  private handleCategory = (category: 'movie' | 'tv'): void => {
    this.setState({ selectedCategory: category });
  };

  public override render(): React.JSX.Element {
    const { isLoading, trendingMovies, trendingTvShows, selectedCategory } =
      this.state;

    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color='#0000ff' />
        </View>
      );
    }
    return (
      <LinearGradient
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={['#0F2027', '#203A43', '#2C5364']}
      >
        <View style={styles.overlay}>
          <View style={styles.category}>
            <TouchableOpacity
              style={styles.btnCategory}
              onPress={() => this.handleCategory('movie')}
            >
              <Text style={styles.textCategory}>Movies</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnCategory}
              onPress={() => this.handleCategory('tv')}
            >
              <Text style={styles.textCategory}>TV</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>
            {selectedCategory === 'movie'
              ? 'Trending Movies'
              : 'Trending TV Shows'}
          </Text>
          <MasonryFlashList
            data={
              selectedCategory === 'movie' ? trendingMovies : trendingTvShows
            }
            renderItem={
              selectedCategory === 'movie'
                ? this.renderMovieItem
                : this.renderTvShowItem
            }
            keyExtractor={item => item.id.toString()}
            numColumns={3}
            estimatedItemSize={200}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </LinearGradient>
    );
  }
}

export default TrendingScreen;
