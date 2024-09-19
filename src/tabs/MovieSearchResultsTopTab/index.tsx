import React from 'react';

import { MovieSearchCard, SearchResultsList } from '@components';
import type { MovieSearchResultsTopTabProps } from '@shared/types';

class MovieSearchResultsTopTab extends React.PureComponent<MovieSearchResultsTopTabProps> {
  public override render(): React.JSX.Element {
    return (
      <SearchResultsList
        data={this.props.data}
        renderItem={({ item, index }) => (
          <MovieSearchCard
            item={item}
            index={index}
            listLength={this.props.data?.length}
            onPress={() => {
              this.props.navigation.navigate('MovieDetailScreen', {
                movieId: item.id,
              });
            }}
          />
        )}
      />
    );
  }
}

export default MovieSearchResultsTopTab;
