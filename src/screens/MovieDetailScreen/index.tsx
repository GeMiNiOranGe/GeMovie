import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import { MovieDetailScreenState, RootScreenProps } from '@shared/types';
import MovieDataFetcher from '@services/MovieDataFetcher';
import { getFormattedDate } from '@shared/utils';
import styles from './style';

class MovieDetailScreen extends React.Component<
  RootScreenProps<'MovieDetailScreen'>,
  MovieDetailScreenState
> {
  constructor(props: RootScreenProps<'MovieDetailScreen'>) {
    super(props);
    this.state = {
      movie: undefined,
    };
  }

  componentDidMount(): void {
    const { movieId } = this.props.route.params;

    MovieDataFetcher.getDetailAsync(movieId).then(data =>
      this.setState({ movie: data }),
    );
  }

  render(): React.JSX.Element {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Title: {this.state.movie?.title}</Text>
        <Text style={styles.text}>Movie id: {this.state.movie?.id}</Text>
        <Text style={styles.text}>
          Date: {getFormattedDate(this.state.movie?.releaseDate)}
        </Text>
        <Text style={styles.text}>index: {this.props.route.params.index}</Text>
      </SafeAreaView>
    );
  }
}

export default MovieDetailScreen;
