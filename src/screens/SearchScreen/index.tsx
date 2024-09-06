import React from 'react';
import { Alert, FlatList, SafeAreaView, Text, View } from 'react-native';
import { SearchBar } from '@rneui/themed';

import type {
  CompanyElement,
  MovieElement,
  RootScreenProps,
  SearchScreenState,
} from '@shared/types';
import { CompanyService, MovieService } from '@services';
import { CompanySearchCard, MovieSearchCard } from '@components';
import { toCompanyElement, toMovieElement } from '@shared/utils';
import { Ionicons } from '@assets/icons';
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
    };

    this.handleSearchContentChange = this.handleSearchContentChange.bind(this);
  }

  private async searchMovies(content: string): Promise<MovieElement[]> {
    const searchPage = await MovieService.searchAsync(content);
    return searchPage.results.map(element => toMovieElement(element));
  }

  private async searchCompanies(content: string): Promise<CompanyElement[]> {
    const searchPage = await CompanyService.searchAsync(content);
    return searchPage.results.map(element => toCompanyElement(element));
  }

  private async handleSearchContentChange(content: string): Promise<void> {
    let movies: MovieElement[] = [];
    let companies: CompanyElement[] = [];

    try {
      [movies, companies] = await Promise.all([
        this.searchMovies(content),
        this.searchCompanies(content),
      ]);
    } catch (error: unknown) {
      if (error instanceof TypeError) {
        Alert.alert('No connection', error.message);
      }
    }

    this.setState({
      results: {
        movies,
        companies,
      },
    });
  }

  public override render(): React.JSX.Element {
    return (
      <SafeAreaView style={styles.container}>
        <SearchBar
          autoFocus
          placeholder='Search for shows, movies,...'
          platform='android'
          value={this.state.searchContent}
          searchIcon={<Ionicons.SearchIcon size={24} color='black' />}
          onCancel={() => this.props.navigation.goBack()}
          onChangeText={(text: string) => {
            this.setState({ searchContent: text });
            this.handleSearchContentChange(text);
          }}
        />
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.contentList}
          data={this.state.results.movies}
          ListHeaderComponent={
            <Text style={[styles.text, styles.listHeader]}>Movie</Text>
          }
          renderItem={({ item, index }) => (
            <MovieSearchCard
              item={item}
              index={index}
              onPress={(): void => {
                this.props.navigation.navigate('MovieDetailScreen', {
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
            <CompanySearchCard item={item} index={index} />
          )}
        />
      </SafeAreaView>
    );
  }
}

export default SearchScreen;
