import React from 'react';
import { type ListRenderItem } from 'react-native';

import { SearchResultsTopTabBase } from '@base';
import { CompanyDetailCard } from '@components';
import { CompanyService } from '@services';
import type {
  CompanyElement,
  SearchResultsTopTabBaseProps,
} from '@shared/types';

class CompanySearchResultsTopTab extends SearchResultsTopTabBase<CompanyElement> {
  public constructor(props: SearchResultsTopTabBaseProps) {
    super(props, CompanyService.searchAsync);
  }

  protected override keyExtractor(item: CompanyElement): string {
    return item.id.toString();
  }

  protected override get noResultsSubtext(): string | undefined {
    return 'No companies found';
  }

  protected override renderItem: ListRenderItem<CompanyElement> = ({
    item,
    index,
  }) => (
    <CompanyDetailCard
      item={item}
      index={index}
      listLength={this.state.results?.length}
      onPress={() => {
        this.props.navigation.navigate('CompanyDetailScreen', {
          companyId: item.id,
        });
      }}
    />
  );
}

export default CompanySearchResultsTopTab;
