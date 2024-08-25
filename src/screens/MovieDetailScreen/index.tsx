import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { TMDB_BASE_IMAGE_URL } from '@config';
import { imageSize } from '@shared/constants';
import { MovieDetailScreenState, RootScreenProps } from '@shared/types';
import MovieDataFetcher from '@services/MovieDataFetcher';
import { getFormattedDate } from '@shared/utils';
import styles from './style';

class MovieDetailScreen extends React.Component<
  RootScreenProps<'MovieDetailScreen'>,
  MovieDetailScreenState
> {
  public constructor(props: RootScreenProps<'MovieDetailScreen'>) {
    super(props);
    this.state = {
      movie: undefined,
    };
  }

  public override componentDidMount(): void {
    const { movieId } = this.props.route.params;

    MovieDataFetcher.getDetailAsync(movieId).then(data =>
      this.setState({ movie: data }),
    );
  }

  public override render(): React.JSX.Element {
    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.backdropImage}
          blurRadius={4}
          source={{
            uri: `${TMDB_BASE_IMAGE_URL}/${imageSize.w1280}${this.state.movie?.backdropPath}`,
          }}
        />

        <ScrollView style={styles.absolute}>
          <View style={styles.posterSection}>
            <LinearGradient
              style={styles.linearGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={['transparent', 'pink']}
            />

            <View style={[styles.absolute, styles.center]}>
              <Image
                style={styles.posterImage}
                source={{
                  uri: `${TMDB_BASE_IMAGE_URL}/${imageSize.w342}${this.state.movie?.posterPath}`,
                }}
              />
            </View>
          </View>

          <View style={styles.content}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>{this.state.movie?.title}</Text>
              <Text style={styles.title}>
                {this.state.movie?.voteAverage} ({this.state.movie?.voteCount})
              </Text>
            </View>

            <View style={styles.introductionSection}>
              <Text style={styles.text}>
                Length: {this.state.movie?.runtime} minutes
              </Text>
              <Text style={styles.text}>
                Release date: {getFormattedDate(this.state.movie?.releaseDate)}
              </Text>
              <Text style={styles.text}>
                Budget: {this.state.movie?.budget}
              </Text>
              <Text style={styles.text}>
                Revenue: {this.state.movie?.revenue}
              </Text>
              <Text style={styles.text}>
                Homepage: {this.state.movie?.homepage}
              </Text>
              <Text style={styles.text}>{this.state.movie?.overview}</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default MovieDetailScreen;
