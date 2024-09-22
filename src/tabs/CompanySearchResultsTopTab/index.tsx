import React from 'react';
import { Alert } from 'react-native';
import type { DebouncedFunc } from 'lodash';
import debounce from 'lodash/debounce';

import { CompanySearchCard, SearchResultsList } from '@components';
import { CompanyService } from '@services';
import type {
  CompanySearchResultsTopTabProps,
  CompanySearchResultsTopTabState,
} from '@shared/types';

class CompanySearchResultsTopTab extends React.PureComponent<
  CompanySearchResultsTopTabProps,
  CompanySearchResultsTopTabState
> {
  private debouncedSearchFirstPage: DebouncedFunc<
    (content: string) => Promise<void>
  >;
  private nextPage = 0;
  private totalPages = 0;
  private totalResults = 0;

  public constructor(props: CompanySearchResultsTopTabProps) {
    super(props);
    this.state = {
      companies: [],
      isFetchingNextPage: false,
    };

    this.debouncedSearchFirstPage = debounce(this.searchFirstPage, 350);
    this.searchNextPage = this.searchNextPage.bind(this);
  }

  private async searchFirstPage(content: string): Promise<void> {
    try {
      const firstPageResponse = await CompanyService.searchAsync(content);

      this.nextPage = firstPageResponse.getPage() + 1;
      this.totalPages = firstPageResponse.getTotalPages();
      this.totalResults = firstPageResponse.getTotalResults();
      this.setState({ companies: firstPageResponse.getResults() });
    } catch (error: unknown) {
      if (error instanceof TypeError) {
        Alert.alert('Error', error.message);
      }
    }
  }

  private async searchNextPage() {
    if (
      this.nextPage > this.totalPages ||
      [this.nextPage, this.totalPages].includes(0) ||
      this.state.isFetchingNextPage
    ) {
      return;
    }

    try {
      this.setState({ isFetchingNextPage: true });
      const nextPageResponse = await CompanyService.searchAsync(
        this.props.searchContent,
        this.nextPage,
      );

      this.nextPage++;
      this.setState({
        companies: [...this.state.companies, ...nextPageResponse.getResults()],
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

    this.searchFirstPage(this.props.searchContent);
  }

  public override async componentDidUpdate(
    prevProps: Readonly<CompanySearchResultsTopTabProps>,
  ): Promise<void> {
    if (this.props.searchContent === prevProps.searchContent) {
      return;
    }

    if (this.props.searchContent.trim() === '') {
      this.nextPage = 0;
      this.totalPages = 0;
      this.totalResults = 0;
      this.setState({ companies: [], isFetchingNextPage: false });
      return;
    }

    this.debouncedSearchFirstPage(this.props.searchContent);
  }

  public override render(): React.JSX.Element {
    return (
      <SearchResultsList
        onEndReached={this.searchNextPage}
        keyExtractor={item => item.id.toString()}
        isFooterLoading={this.state.isFetchingNextPage}
        totalResults={this.totalResults}
        data={this.state.companies}
        renderItem={({ item, index }) => (
          <CompanySearchCard
            item={item}
            index={index}
            listLength={this.state.companies?.length}
            onPress={() => {
              this.props.navigation.navigate('CompanyDetailScreen', {
                companyId: item.id,
              });
            }}
          />
        )}
      />
    );
  }
}

export default CompanySearchResultsTopTab;
