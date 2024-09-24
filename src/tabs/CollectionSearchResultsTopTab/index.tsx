import React from 'react';
import { ListRenderItem } from 'react-native';

import { SearchResultsTopTabBase } from '@base';
import { CollectionSearchCard } from '@components';
import { CollectionService } from '@services';
import type {
  CollectionElement,
  SearchResultsTopTabBaseProps,
} from '@shared/types';

class CollectionSearchResultsTopTab extends SearchResultsTopTabBase<CollectionElement> {
  public constructor(props: SearchResultsTopTabBaseProps) {
    super(props, CollectionService.searchAsync);
  }

  protected override keyExtractor(item: CollectionElement): string {
    return item.id.toString();
  }

  protected override get noResultsSubtext(): string | undefined {
    return 'No collections found';
  }

  protected override renderItem: ListRenderItem<CollectionElement> = ({
    item,
    index,
  }) => (
    <CollectionSearchCard
      item={item}
      index={index}
      listLength={this.state.results?.length}
      onPress={() => {
        this.props.navigation.navigate('CollectionDetailScreen', {
          collectionId: item.id,
        });
      }}
    />
  );
}

export default CollectionSearchResultsTopTab;
