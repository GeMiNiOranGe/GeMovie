import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TMDB_API_KEY, TMDB_BASE_URL } from '@config';
import { GenreService } from '@services';
import { MovieDetailCard } from '@components';
import { toMovieElement } from '@shared/utils';
import type {
  MovieElement,
  RootScreenProps,
  TopRatedState,
} from '@shared/types';
import styles from './style';

class TopRated extends React.Component<
  RootScreenProps<'SeeAllTopRated'>,
  TopRatedState
> {
  public constructor(props: RootScreenProps<'SeeAllTopRated'>) {
    super(props);
    this.state = {
      movies: [],
    };

    this.renderItem = this.renderItem.bind(this);
  }

  public override async componentDidMount(): Promise<void> {
    await GenreService.instance.fetchGenres();

    const topRatedUrl = `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`;
    fetch(topRatedUrl)
      .then(response => response.json())
      .then(movieData => {
        this.setState({
          movies: movieData.results.map((element: any) =>
            toMovieElement(element),
          ),
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  private renderItem({
    item,
    index,
  }: ListRenderItemInfo<MovieElement>): React.JSX.Element {
    return (
      <MovieDetailCard
        showRank
        item={item}
        index={index}
        listLength={this.state.movies.length}
        onPress={() => {
          this.props.navigation.navigate('MovieDetailScreen', {
            movieId: item.id,
          });
        }}
      />
    );
  }

  public override render(): React.JSX.Element {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          contentContainerStyle={styles.contentList}
          data={this.state.movies}
          renderItem={this.renderItem}
        />
      </SafeAreaView>
    );
  }
}

export default TopRated;
