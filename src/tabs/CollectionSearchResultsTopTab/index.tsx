import React from 'react';
import type { DebouncedFunc } from 'lodash';
import debounce from 'lodash/debounce';

import { CollectionSearchCard, SearchResultsList } from '@components';
import { CollectionService } from '@services';
import type {
  CollectionSearchResultsTopTabProps,
  CollectionSearchResultsTopTabState,
} from '@shared/types';

class CollectionSearchResultsTopTab extends React.PureComponent<
  CollectionSearchResultsTopTabProps,
  CollectionSearchResultsTopTabState
> {
  private debouncedSearchCollections: DebouncedFunc<
    (content: string) => Promise<void>
  >;

  public constructor(props: CollectionSearchResultsTopTabProps) {
    super(props);
    this.state = {
      collections: [],
    };

    this.debouncedSearchCollections = debounce(this.searchCollections, 350);
  }

  private async searchCollections(content: string): Promise<void> {
    const tvShowResponse = await CollectionService.searchAsync(content);
    this.setState({ collections: tvShowResponse.getResults() });
  }

  public override componentDidMount(): void {
    if (this.props.searchContent.trim() === '') {
      return;
    }

    this.searchCollections(this.props.searchContent);
  }

  public override async componentDidUpdate(
    prevProps: Readonly<CollectionSearchResultsTopTabProps>,
  ): Promise<void> {
    if (this.props.searchContent === prevProps.searchContent) {
      return;
    }

    if (this.props.searchContent.trim() === '') {
      this.setState({ collections: [] });
      return;
    }

    this.debouncedSearchCollections(this.props.searchContent);
  }

  public override render(): React.JSX.Element {
    return (
      <SearchResultsList
        data={this.state.collections}
        renderItem={({ item, index }) => (
          <CollectionSearchCard
            item={item}
            index={index}
            listLength={this.state.collections?.length}
            onPress={() => {
              this.props.navigation.navigate('CollectionDetailScreen', {
                tvShowId: item.id,
              });
            }}
          />
        )}
      />
    );
  }
}

export default CollectionSearchResultsTopTab;
