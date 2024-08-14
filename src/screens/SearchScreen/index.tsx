import React from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import type {
  SearchPage,
  SearchScreenProps,
  SearchScreenState,
} from '@shared/types';
import MovieDataFetcher from '@services/MovieDataFetcher';
import styles from './style';

class SearchScreen extends React.Component<
  SearchScreenProps,
  SearchScreenState
> {
  constructor(props: SearchScreenProps) {
    super(props);
    this.state = {
      movies: [],
    };
  }

  componentDidMount(): void {
    MovieDataFetcher.searchAsync('House').then((data: SearchPage) =>
      this.setState({ movies: data.results }),
    );
  }

  render(): React.JSX.Element {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.movies}
          renderItem={({ item }) => (
            <TouchableHighlight
              underlayColor={'pink'}
              onPress={() =>
                this.props.navigation.navigate('MovieDetailScreen')
              }
            >
              <View>
                <Text style={styles.btnText}>Title: {item.title}</Text>
                <Text style={styles.btnText}>Id: {item.id}</Text>
              </View>
            </TouchableHighlight>
          )}
        />
      </SafeAreaView>
    );
  }
}

export default SearchScreen;
