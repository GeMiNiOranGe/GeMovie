import React from 'react';
import { Alert, FlatList, SafeAreaView } from 'react-native';

import type {
  SearchPage,
  SearchScreenProps,
  SearchScreenState,
} from '@shared/types';
import MovieDataFetcher from '@services/MovieDataFetcher';
import { HorizontalImageCard } from '@components';
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
    MovieDataFetcher.searchAsync('Home')
      .then((data: SearchPage) => this.setState({ movies: data.results }))
      .catch((err: TypeError) => Alert.alert('No connection', err.message));
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
