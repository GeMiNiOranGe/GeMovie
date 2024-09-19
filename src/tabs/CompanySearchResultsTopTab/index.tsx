import React from 'react';
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
  private debouncedSearchCompanies: DebouncedFunc<
    (content: string) => Promise<void>
  >;

  public constructor(props: CompanySearchResultsTopTabProps) {
    super(props);
    this.state = {
      companies: [],
    };

    this.debouncedSearchCompanies = debounce(this.searchCompanies, 350);
  }

  private async searchCompanies(content: string): Promise<void> {
    const companyResponse = await CompanyService.searchAsync(content);
    this.setState({ companies: companyResponse.getResults() });
  }

  public override componentDidMount(): void {
    if (this.props.searchContent.trim() === '') {
      return;
    }

    this.searchCompanies(this.props.searchContent);
  }

  public override async componentDidUpdate(
    prevProps: Readonly<CompanySearchResultsTopTabProps>,
  ): Promise<void> {
    if (this.props.searchContent === prevProps.searchContent) {
      return;
    }

    if (this.props.searchContent.trim() === '') {
      this.setState({ companies: [] });
      return;
    }

    this.debouncedSearchCompanies(this.props.searchContent);
  }

  public override render(): React.JSX.Element {
    return (
      <SearchResultsList
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
