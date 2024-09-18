import React from 'react';
import { Text, View } from 'react-native';

import { SearchResultsList } from '@components';
import type { TvShowSearchResultsTopTabProps } from '@shared/types';

class TvShowSearchResultsTopTab extends React.PureComponent<TvShowSearchResultsTopTabProps> {
  public override render(): React.JSX.Element {
    return (
      <SearchResultsList
        data={this.props.data}
        renderItem={({ item, index }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.id}</Text>
          </View>
        )}
      />
    );
  }
}

export default TvShowSearchResultsTopTab;
