import React from 'react';
import type { DebouncedFunc } from 'lodash';
import debounce from 'lodash/debounce';

import { SearchResultsList, TvShowSearchCard } from '@components';
import { TvShowService } from '@services';
import type {
  TvShowSearchResultsTopTabProps,
  TvShowSearchResultsTopTabState,
} from '@shared/types';

class TvShowSearchResultsTopTab extends React.PureComponent<
  TvShowSearchResultsTopTabProps,
  TvShowSearchResultsTopTabState
> {
  private debouncedSearchTvShows: DebouncedFunc<
    (content: string) => Promise<void>
  >;

  public constructor(props: TvShowSearchResultsTopTabProps) {
    super(props);
    this.state = {
      tvShows: [],
    };

    this.debouncedSearchTvShows = debounce(this.searchTvShows, 350);
  }

  private async searchTvShows(content: string): Promise<void> {
    const tvShowResponse = await TvShowService.searchAsync(content);
    this.setState({ tvShows: tvShowResponse.getResults() });
  }

  public override componentDidMount(): void {
    this.searchTvShows(this.props.searchContent);
  }

  public override async componentDidUpdate(
    prevProps: Readonly<TvShowSearchResultsTopTabProps>,
  ): Promise<void> {
    if (this.props.searchContent === prevProps.searchContent) {
      return;
    }

    if (this.props.searchContent.trim() === '') {
      this.setState({ tvShows: [] });
      return;
    }

    this.debouncedSearchTvShows(this.props.searchContent);
  }

  public override render(): React.JSX.Element {
    return (
      <SearchResultsList
        data={this.state.tvShows}
        renderItem={({ item, index }) => (
          <TvShowSearchCard
            item={item}
            index={index}
            listLength={this.state.tvShows?.length}
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
