import React from 'react';
import { Alert, Dimensions, SafeAreaView, View } from 'react-native';
import { IconButton, Searchbar } from 'react-native-paper';
import { ArrowLeft2, SearchNormal1 } from 'iconsax-react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import type { DebouncedFunc } from 'lodash';
import debounce from 'lodash/debounce';

import type {
  CompanyElement,
  MovieElement,
  RootScreenProps,
  SearchScreenState,
  TvShowElement,
} from '@shared/types';
import {
  CompanySearchResultsTopTab,
  MovieSearchResultsTopTab,
  TvShowSearchResultsTopTab,
} from '@tabs';
import { CompanyService, MovieService, TvShowService } from '@services';
import { layout } from '@shared/themes';
import styles from './style';

const debounceWaitTime = 425;
const TopTab = createMaterialTopTabNavigator();

class SearchScreen extends React.Component<
  RootScreenProps<'SearchScreen'>,
  SearchScreenState
> {
  private debouncedFetchSearchResults: DebouncedFunc<
    (content: string) => Promise<void>
  >;

  public constructor(props: RootScreenProps<'SearchScreen'>) {
    super(props);
    this.state = {
      results: {
        movies: [],
        tvShows: [],
        companies: [],
      },
      searchContent: '',
    };

    this.handleSearchbarTextChange = this.handleSearchbarTextChange.bind(this);
    this.debouncedFetchSearchResults = debounce(
      this.fetchSearchResults,
      debounceWaitTime,
    );
  }

  private async fetchSearchResults(content: string): Promise<void> {
    let movies: MovieElement[] = [];
    let tvShows: TvShowElement[] = [];
    let companies: CompanyElement[] = [];

    try {
      const [movieResponse, tvShowResponse, companyResponse] =
        await Promise.all([
          MovieService.searchAsync(content),
          TvShowService.searchAsync(content),
          CompanyService.searchAsync(content),
        ]);

      movies = movieResponse.getResults();
      tvShows = tvShowResponse.getResults();
      companies = companyResponse.getResults();
    } catch (error: unknown) {
      if (error instanceof TypeError) {
        Alert.alert('No connection', error.message);
      }
    }

    this.setState({
      results: {
        movies,
        tvShows,
        companies,
      },
    });
  }

  private handleSearchbarTextChange(text: string) {
    if (text.trim() === '') {
      this.setState({
        searchContent: text,
        results: {
          movies: [],
          tvShows: [],
          companies: [],
        },
      });
      return;
    }

    this.setState({ searchContent: text });
    this.debouncedFetchSearchResults(text);
  }

  private renderReturnIcon() {
    return <ArrowLeft2 size='24' color='black' />;
  }

  private renderSearchIcon() {
    return <SearchNormal1 size='16' color='black' />;
  }

  public override render(): React.JSX.Element {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.searchBarBox}>
          <View style={layout.center}>
            <IconButton
              onPress={() => this.props.navigation.goBack()}
              icon={this.renderReturnIcon}
            />
          </View>

          <Searchbar
            style={styles.searchBar}
            inputStyle={styles.searchBarInput}
            icon={this.renderSearchIcon}
            autoFocus
            placeholder='Search for shows, movies,...'
            value={this.state.searchContent}
            onChangeText={this.handleSearchbarTextChange}
          />
        </View>

        <TopTab.Navigator
          initialRouteName='MovieSearchResultsTopTab'
          initialLayout={{ width: Dimensions.get('window').width }}
          screenOptions={{
            swipeEnabled: false,
          }}
        >
          <TopTab.Screen
            name='MovieSearchResultsTopTab'
            children={() => (
              <MovieSearchResultsTopTab
                data={this.state.results.movies}
                navigation={this.props.navigation}
              />
            )}
            options={{
              title: 'Movie',
            }}
          />

          <TopTab.Screen
            name='TvShowSearchResultsTopTab'
            children={() => (
              <TvShowSearchResultsTopTab
                data={this.state.results.tvShows}
                navigation={this.props.navigation}
              />
            )}
            options={{
              title: 'Tv show',
            }}
          />

          <TopTab.Screen
            name='CompanySearchResultsTopTab'
            children={() => (
              <CompanySearchResultsTopTab
                data={this.state.results.companies}
                navigation={this.props.navigation}
              />
            )}
            options={{
              title: 'Company',
            }}
          />
        </TopTab.Navigator>
      </SafeAreaView>
    );
  }
}

export default SearchScreen;
