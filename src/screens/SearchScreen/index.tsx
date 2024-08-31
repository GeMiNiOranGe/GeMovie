import React from 'react';
import { Alert, FlatList, SafeAreaView, Text, View } from 'react-native';

import type {
  CompanyElement,
  MovieElement,
  RootScreenProps,
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

  private async searchMovies(content: string): Promise<MovieElement[]> {
    const searchPage = await MovieDataFetcher.searchAsync(content);
    return searchPage.results.map(element => toMovieElement(element));
  }

  private async searchCompanies(content: string): Promise<CompanyElement[]> {
    const searchPage = await CompanyDataFetcher.searchAsync(content);
    return searchPage.results.map(element => toCompanyElement(element));
  }

  private async handleSearchContentChange(content: string): Promise<void> {
    let movies: MovieElement[] = [];
    let companies: CompanyElement[] = [];

    try {
      if (content) {
        [movies, companies] = await Promise.all([
          this.searchMovies(content),
          this.searchCompanies(content),
        ]);
      }
    } catch (error: unknown) {
      if (error instanceof TypeError) {
        Alert.alert('No connection', error.message);
      }
    }

    this.setState({
      searchContent: content,
      results: {
        movies,
        companies,
      },
    });
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
                <Text style={[styles.text, styles.listHeader]}>Movie</Text>
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
                <Text style={[styles.text, styles.listHeader]}>Company</Text>
              }
              renderItem={({ item, index }) => (
                <View>
                  <Text style={styles.companyText}>{item.id}</Text>
                  <Text style={styles.companyText}>{item.name}</Text>
                  <Text style={styles.companyText}>{item.logoPath}</Text>
                  <Text style={styles.companyText}>{item.originCountry}</Text>
                  <Text style={styles.companyText}>{index}</Text>
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
