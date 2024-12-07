import React from 'react';
import { Alert, ListRenderItem } from 'react-native';
import debounce from 'lodash/debounce';

import { PaginatedResultsList } from '@components';
import type {
  DebouncedSearch,
  SearchAsync,
  CardElement,
  SearchResultsTopTabBaseProps,
  SearchResultsTopTabBaseState,
} from '@shared/types';

abstract class SearchResultsTopTabBase<
  T extends CardElement,
  P extends SearchResultsTopTabBaseProps = SearchResultsTopTabBaseProps,
> extends React.PureComponent<P, SearchResultsTopTabBaseState<T>> {
  private debouncedSearch: DebouncedSearch;
  private nextPage = 0;
  private totalPages = 0;
  private totalResults = 0;
  private searchAsync!: SearchAsync<T>;

  protected abstract keyExtractor(item: T, index?: number): string;
  protected abstract renderItem: ListRenderItem<T> | null | undefined;

  protected constructor(props: P, searchAsync: SearchAsync<T>) {
    super(props);
    this.state = {
      results: undefined,
      isFetchingNextPage: false,
    };
    this.searchAsync = searchAsync;

    this.debouncedSearch = debounce(this.search, 350);
    this.searchNextPage = this.searchNextPage.bind(this);
  }

  protected get noResultsIcon(): React.JSX.Element | undefined {
    return undefined;
  }

  protected get noResultsText(): string | undefined {
    return undefined;
  }

  protected get noResultsSubtext(): string | undefined {
    return undefined;
  }

  private async search(content: string): Promise<void> {
    try {
      const response = await this.searchAsync(content);

      this.nextPage = response.getPage() + 1;
      this.totalPages = response.getTotalPages();
      this.totalResults = response.getTotalResults();
      this.setState({ results: response.getResults() });
    } catch (error: unknown) {
      if (error instanceof TypeError) {
        Alert.alert('Error', error.message);
      }
    }
  }

  private async searchNextPage(): Promise<void> {
    if (
      this.nextPage > this.totalPages ||
      [this.nextPage, this.totalPages].includes(0) ||
      this.state.isFetchingNextPage
    ) {
      return;
    }

    try {
      this.setState({ isFetchingNextPage: true });
      const response = await this.searchAsync(
        this.props.searchContent,
        this.nextPage,
      );

      this.nextPage++;
      this.setState({
        results: this.state.results && [
          ...this.state.results,
          ...response.getResults(),
        ],
        isFetchingNextPage: false,
      });
    } catch (error: unknown) {
      if (error instanceof TypeError) {
        Alert.alert('Error', error.message);
      }
    } finally {
      this.setState({ isFetchingNextPage: false });
    }
  }

  public override componentDidMount(): void {
    if (this.props.searchContent.trim() === '') {
      return;
    }

    this.search(this.props.searchContent);
  }

  public override componentDidUpdate(prevProps: Readonly<P>): void {
    if (this.props.searchContent === prevProps.searchContent) {
      return;
    }

    if (this.props.searchContent.trim() === '') {
      this.nextPage = 0;
      this.totalPages = 0;
      this.totalResults = 0;
      this.setState({ results: undefined });
      return;
    }

    this.debouncedSearch(this.props.searchContent);
  }

  public override render(): React.ReactNode {
    if (!this.state.results) {
      return undefined;
    }

    return (
      <PaginatedResultsList
        onEndReached={this.searchNextPage}
        keyExtractor={this.keyExtractor}
        isFooterLoading={this.state.isFetchingNextPage}
        totalResults={this.totalResults}
        noResultsIcon={this.noResultsIcon}
        noResultsText={this.noResultsText}
        noResultsSubtext={this.noResultsSubtext}
        data={this.state.results}
        renderItem={this.renderItem}
      />
    );
  }
}

export default SearchResultsTopTabBase;
