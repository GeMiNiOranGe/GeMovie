import React from 'react';

import { SearchResultsList, TvShowSearchCard } from '@components';
import type { TvShowSearchResultsTopTabProps } from '@shared/types';

class TvShowSearchResultsTopTab extends React.PureComponent<TvShowSearchResultsTopTabProps> {
  public override render(): React.JSX.Element {
    return (
      <SearchResultsList
        data={this.props.data}
        renderItem={({ item, index }) => (
          <TvShowSearchCard
            item={item}
            index={index}
            listLength={this.props.data?.length}
            onPress={() => {
              this.props.navigation.navigate('TvShowDetailScreen', {
                tvShowId: item.id,
              });
            }}
          />
        )}
      />
    );
  }
}

export default TvShowSearchResultsTopTab;
