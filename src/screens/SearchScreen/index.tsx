import React from 'react';
import { Alert, FlatList, SafeAreaView, Text, View } from 'react-native';

import type {
  CompanyElement,
  RootScreenProps,
  SearchPage,
  SearchScreenState,
} from '@shared/types';
import MovieDataFetcher from '@services/MovieDataFetcher';
import CompanyDataFetcher from '@services/CompanyDataFetcher';
import { HorizontalImageCard } from '@components';
import { toCompanyElement, toMovieElement } from '@shared/utils';
import styles from './style';

class SearchScreen extends React.Component<
  RootScreenProps<'SearchScreen'>,
  SearchScreenState
> {
  public constructor(props: RootScreenProps<'SearchScreen'>) {
    super(props);
    this.state = {
      results: {
        movies: [],
        companies: [],
      },
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
          results: {
            movies: data.results.map(element => toMovieElement(element)),
          },
        }),
      )
      .catch((err: TypeError) => Alert.alert('No connection', err.message));
  }

  private fetchCompanies(searchContent: string): void {
    CompanyDataFetcher.searchAsync(searchContent)
      .then((data: SearchPage) =>
        this.setState({
          results: {
            companies: data.results.map(element => toCompanyElement(element)),
          },
        }),
      )
      .catch((err: TypeError) => Alert.alert('No connection', err.message));
  }

  private async handleSearchContentChange(
    searchContent: string,
  ): Promise<void> {
    this.setState({ searchContent });
    if (searchContent) {
      await Promise.all([
        this.fetchMovies(searchContent),
        this.fetchCompanies(searchContent),
      ]);
    } else {
      this.setState({
        results: {
          movies: [],
          companies: [],
        },
      });
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
              data={this.state.results.movies}
              ListHeaderComponent={
                <Text style={[styles.text, { paddingHorizontal: 16 }]}>
                  Movie
                </Text>
              }
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
            <FlatList
              style={styles.list}
              contentContainerStyle={styles.contentList}
              data={this.state.results.companies}
              ListHeaderComponent={
                <Text style={[styles.text, { paddingHorizontal: 16 }]}>
                  Company
                </Text>
              }
              renderItem={({ item, index }) => (
                <View>
                  <Text style={{ color: 'black' }}>{item.id}</Text>
                  <Text style={{ color: 'black' }}>{item.name}</Text>
                  <Text style={{ color: 'black' }}>{item.logoPath}</Text>
                  <Text style={{ color: 'black' }}>{item.originCountry}</Text>
                  <Text style={{ color: 'black' }}>{index}</Text>
                </View>
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
