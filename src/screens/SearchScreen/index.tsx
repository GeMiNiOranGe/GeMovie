import React from 'react';
import { Dimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton, Searchbar } from 'react-native-paper';
import { ArrowLeft2, SearchNormal1 } from 'iconsax-react-native';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';

import type { RootScreenProps, SearchScreenState } from '@shared/types';
import {
  CollectionSearchResultsTopTab,
  CompanySearchResultsTopTab,
  MovieSearchResultsTopTab,
  MultiSearchResultsTopTab,
  PersonSearchResultsTopTab,
  TvShowSearchResultsTopTab,
} from '@tabs';
import { GenreService } from '@services';
import { SearchResultsTabBar } from '@components';
import { layout } from '@shared/themes';
import styles from './style';

const TopTab = createMaterialTopTabNavigator();

class SearchScreen extends React.Component<
  RootScreenProps<'SearchScreen'>,
  SearchScreenState
> {
  public constructor(props: RootScreenProps<'SearchScreen'>) {
    super(props);
    this.state = {
      searchContent: '',
    };

    this.handleSearchbarTextChange = this.handleSearchbarTextChange.bind(this);
  }

  private handleSearchbarTextChange(text: string): void {
    if (text.trim() === '') {
      this.setState({ searchContent: text });
      return;
    }

    this.setState({ searchContent: text });
  }

  private renderReturnIcon(): React.JSX.Element {
    return <ArrowLeft2 size='24' color='black' />;
  }

  private renderSearchIcon(): React.JSX.Element {
    return <SearchNormal1 size='16' color='black' />;
  }

  private renderTabBar(props: MaterialTopTabBarProps): React.JSX.Element {
    return <SearchResultsTabBar {...props} />;
  }

  public override async componentDidMount(): Promise<void> {
    await GenreService.instance.fetchGenres();
  }

  public override render(): React.JSX.Element {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.searchBarBox}>
          <View style={layout.center}>
            <IconButton
              style={styles.returnIcon}
              size={32}
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
          initialRouteName='MultiSearchResultsTopTab'
          initialLayout={{ width: Dimensions.get('window').width }}
          screenOptions={{
            swipeEnabled: false,
            lazy: true,
            tabBarScrollEnabled: true,
          }}
          tabBar={this.renderTabBar}
        >
          <TopTab.Screen
            name='MultiSearchResultsTopTab'
            options={{
              title: 'All',
            }}
          >
            {() => (
              <MultiSearchResultsTopTab
                searchContent={this.state.searchContent}
                navigation={this.props.navigation}
              />
            )}
          </TopTab.Screen>

          <TopTab.Screen
            name='MovieSearchResultsTopTab'
            options={{
              title: 'Movie',
            }}
          >
            {() => (
              <MovieSearchResultsTopTab
                searchContent={this.state.searchContent}
                navigation={this.props.navigation}
              />
            )}
          </TopTab.Screen>

          <TopTab.Screen
            name='TvShowSearchResultsTopTab'
            options={{
              title: 'Tv series',
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
            name='PersonSearchResultsTopTab'
            options={{
              title: 'Person',
            }}
          >
            {() => (
              <PersonSearchResultsTopTab
                searchContent={this.state.searchContent}
                navigation={this.props.navigation}
              />
            )}
          </TopTab.Screen>

          <TopTab.Screen
            name='CollectionSearchResultsTopTab'
            options={{
              title: 'Collection',
            }}
          >
            {() => (
              <CollectionSearchResultsTopTab
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
