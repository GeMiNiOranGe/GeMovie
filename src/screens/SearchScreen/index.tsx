import React from 'react';
import { Alert, FlatList, SafeAreaView, Text } from 'react-native';

import type {
  RootScreenProps,
  SearchPage,
  SearchScreenState,
} from '@shared/types';
import MovieDataFetcher from '@services/MovieDataFetcher';
import { HorizontalImageCard } from '@components';
import { toMovieElement } from '@shared/utils';
import styles from './style';

class SearchScreen extends React.Component<
  RootScreenProps<'SearchScreen'>,
  SearchScreenState
> {
  public constructor(props: RootScreenProps<'SearchScreen'>) {
    super(props);
    this.state = {
      movies: [],
      searchContent: '',
      isSearchBarOpen: false,
    };

    this.handleSearchContentChange = this.handleSearchContentChange.bind(this);
  }

  public override componentDidMount(): void {
    this.props.navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: 'Search for a movie',
        onChangeText: e => {
          e.persist();
          this.handleSearchContentChange(e.nativeEvent.text);
        },
        textColor: 'black',
        shouldShowHintSearchIcon: false,
        headerIconColor: 'black',
        hintTextColor: 'gray',
        onOpen: () => {
          this.setState({ isSearchBarOpen: true });
        },
        onClose: () => {
          this.setState({ isSearchBarOpen: false });
        },
      },
    });
  }

  private fetchMovies(searchContent: string): void {
    MovieDataFetcher.searchAsync(searchContent)
      .then((data: SearchPage) =>
        this.setState({
          movies: data.results.map(element => toMovieElement(element)),
        }),
      )
      .catch((err: TypeError) => Alert.alert('No connection', err.message));
  }

  private handleSearchContentChange(searchContent: string): void {
    this.setState({ searchContent });
    if (searchContent) {
      this.fetchMovies(searchContent);
    } else {
      this.setState({ movies: [] });
    }
  }

  private renderSuggesttionFragment(): React.JSX.Element {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <Text style={styles.text}>Search suggestion</Text>
      </SafeAreaView>
    );
  }

  public override render(): React.JSX.Element {
    return (
      <>
        {this.state.isSearchBarOpen ? (
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
                      movieId: item.id,
                    });
                  }}
                />
              )}
            />
          </SafeAreaView>
        ) : (
          this.renderSuggesttionFragment()
        )}
      </>
    );
  }
}

export default SearchScreen;
