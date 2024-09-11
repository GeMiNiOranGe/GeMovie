import React from 'react';
import { Alert, FlatList, SafeAreaView, View } from 'react-native';
import { IconButton, Searchbar } from 'react-native-paper';
import { ArrowLeft2, SearchNormal1 } from 'iconsax-react-native';
import { TabView, Route } from 'react-native-tab-view';

import type {
  CompanyElement,
  MovieElement,
  RootScreenProps,
  SearchScreenState,
} from '@shared/types';
import { CompanyService, MovieService } from '@services';
import { CompanySearchCard, MovieSearchCard } from '@components';
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
      index: 0,
      routes: [
        { key: 'movie', title: 'Movie' },
        { key: 'company', title: 'Company' },
      ],
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

  private renderReturnIcon() {
    return <ArrowLeft2 size='24' color='black' />;
  }

  private renderSearchIcon() {
    return <SearchNormal1 size='16' color='black' />;
  }

  private renderScene = ({ route }: { route: Route }) => {
    switch (route.key) {
      case 'movie':
        return (
          <FlatList
            style={styles.list}
            contentContainerStyle={styles.contentList}
            keyboardShouldPersistTaps='handled'
            data={this.state.results.movies}
            renderItem={({ item, index }) => (
              <MovieSearchCard
                item={item}
                index={index}
                onPress={() => {
                  this.props.navigation.navigate('MovieDetailScreen', {
                    movieId: item.id,
                  });
                }}
              />
            )}
          />
        );
      case 'company':
        return (
          <FlatList
            style={styles.list}
            contentContainerStyle={styles.contentList}
            keyboardShouldPersistTaps='handled'
            data={this.state.results.companies}
            renderItem={({ item, index }) => (
              <CompanySearchCard
                item={item}
                index={index}
                onPress={() => {
                  this.props.navigation.navigate('CompanyDetailScreen', {
                    companyId: item.id,
                  });
                }}
              />
            )}
          />
        );
      default:
        return null;
    }
  };

  public override render(): React.JSX.Element {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.searchBarBox}>
          <View style={styles.center}>
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
            onChangeText={(text: string) => {
              this.setState({ searchContent: text });
              this.handleSearchContentChange(text);
            }}
          />
        </View>

        <TabView
          navigationState={{
            index: this.state.index,
            routes: this.state.routes,
          }}
          renderScene={this.renderScene}
          onIndexChange={index => this.setState({ index })}
        />
      </SafeAreaView>
    );
  }
}

export default SearchScreen;
