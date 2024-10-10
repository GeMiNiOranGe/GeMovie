import {
  View,
  ActivityIndicator,
  Text,
  Image,
  ImageBackground,
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

  public override componentDidMount() {
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

        this.setState(
          {
            trendingMovies,
            trendingTvShows,
            isLoading: false,
          },
          this.updateRandomBackgroundImage,
        );
        this.intervalId = setInterval(this.updateRandomBackgroundImage, 10000);
      })
      .catch(error => {
        console.error('Error fetching trending data:', error);
        this.setState({ isLoading: false });
      });
  }

  public override componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateRandomBackgroundImage = () => {
    const randomItem = this.getRandomTrendingItem();
    if (randomItem) {
      const imagePath = randomItem.backdrop_path || randomItem.poster_path;
      const backgroundImageUrl = imagePath
        ? URLBuilder.buildImageURL('w1280', imagePath)
        : null;
      this.setState({
        backgroundImage: backgroundImageUrl
          ? { uri: backgroundImageUrl }
          : undefined,
      });
    }
  };

  public renderMovieItem = ({ item }: { item: FeaturedMovie }) => {
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

  public renderTvShowItem = ({ item }: { item: FeaturedTvShow }) => {
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

  private handleCategory = (category: 'movie' | 'tv') => {
    this.setState({ selectedCategory: category });
  };

  public override render() {
    const {
      isLoading,
      trendingMovies,
      trendingTvShows,
      backgroundImage,
      selectedCategory,
    } = this.state;

    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color='#0000ff' />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {backgroundImage ? (
          <ImageBackground
            source={backgroundImage}
            style={styles.background}
            blurRadius={5}
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
                  selectedCategory === 'movie'
                    ? trendingMovies
                    : trendingTvShows
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
          </ImageBackground>
        ) : (
          <View style={styles.container}>
            <Icon
              name='film'
              size={60}
              color='black'
              style={styles.movieThumbnail}
            />
          </View>
        )}
      </View>
    );
  }
}

export default TrendingScreen;
