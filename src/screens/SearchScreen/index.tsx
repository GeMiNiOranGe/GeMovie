import React from 'react';
import { Alert, Dimensions, SafeAreaView, View } from 'react-native';
import { IconButton, Searchbar } from 'react-native-paper';
import { ArrowLeft2, SearchNormal1 } from 'iconsax-react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import type { DebouncedFunc } from 'lodash';
import debounce from 'lodash/debounce';

import type {
  MovieElement,
  RootScreenProps,
  SearchScreenState,
} from '@shared/types';
import {
  CompanySearchResultsTopTab,
  MovieSearchResultsTopTab,
  TvShowSearchResultsTopTab,
} from '@tabs';
import { MovieService } from '@services';
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

    try {
      const [movieResponse] = await Promise.all([
        MovieService.searchAsync(content),
      ]);

      movies = movieResponse.getResults();
    } catch (error: unknown) {
      if (error instanceof TypeError) {
        Alert.alert('No connection', error.message);
      }
    }

    this.setState({
      results: {
        movies,
      },
    });
  }

  private handleSearchbarTextChange(text: string) {
    if (text.trim() === '') {
      this.setState({
        searchContent: text,
        results: {
          movies: [],
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
            lazy: true,
          }}
        >
          <TopTab.Screen
            name='MovieSearchResultsTopTab'
            options={{
              title: 'Movie',
            }}
          >
            {() => (
              <MovieSearchResultsTopTab
                data={this.state.results.movies}
                navigation={this.props.navigation}
              />
            )}
          </TopTab.Screen>

          <TopTab.Screen
            name='TvShowSearchResultsTopTab'
            options={{
              title: 'Tv show',
            }}
          >
            {() => (
              <TvShowSearchResultsTopTab
                searchContent={this.state.searchContent}
                navigation={this.props.navigation}
              />
            )}
          </TopTab.Screen>

          <TopTab.Screen
            name='CompanySearchResultsTopTab'
            options={{
              title: 'Company',
            }}
          >
            {() => (
              <CompanySearchResultsTopTab
                searchContent={this.state.searchContent}
                navigation={this.props.navigation}
              />
            )}
          </TopTab.Screen>
        </TopTab.Navigator>
      </SafeAreaView>
    );
  }
}

export default SearchScreen;
