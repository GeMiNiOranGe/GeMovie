import React from 'react';
import { Alert, FlatList, SafeAreaView } from 'react-native';

import type {
  SearchPage,
  SearchScreenProps,
  SearchScreenState,
} from '@shared/types';
import MovieDataFetcher from '@services/MovieDataFetcher';
import { HorizontalImageCard } from '@components';
import { toMovie } from '@shared/utils';
import styles from './style';

class SearchScreen extends React.Component<
  SearchScreenProps,
  SearchScreenState
> {
  constructor(props: SearchScreenProps) {
    super(props);
    this.state = {
      movies: [],
      searchContent: '',
    };

    this.handleSearchContentChange = this.handleSearchContentChange.bind(this);

    this.props.navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: 'Search for a movie',
        onChangeText: e => {
          e.persist();
          this.handleSearchContentChange(e.nativeEvent.text);
        },
        headerIconColor: 'black',
        hintTextColor: 'gray',
        textColor: 'black',
        barTintColor: 'lightgray',
      },
    });
  }

  fetchMovies(searchContent: string): void {
    MovieDataFetcher.searchAsync(searchContent)
      .then((data: SearchPage) =>
        this.setState({
          movies: data.results.map(element => toMovie(element)),
        }),
      )
      .catch((err: TypeError) => Alert.alert('No connection', err.message));
  }

  handleSearchContentChange(searchContent: string): void {
    this.setState({ searchContent });
    if (searchContent) {
      this.fetchMovies(searchContent);
    } else {
      this.setState({ movies: [] });
    }
  }

  render(): React.JSX.Element {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.contentList}
          data={this.state.movies}
          renderItem={({ item, index }) => (
            <HorizontalImageCard
              item={item}
              index={index}
              onPress={(): void => {
                this.props.navigation.navigate('MovieDetailScreen', {
                  index,
                });
              }}
            />
          )}
        />
      </SafeAreaView>
    );
  }
}

export default SearchScreen;
