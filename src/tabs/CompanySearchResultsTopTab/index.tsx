import React from 'react';

import { CompanySearchCard, SearchResultsList } from '@components';
import type { CompanySearchResultsTopTabProps } from '@shared/types';

class CompanySearchResultsTopTab extends React.PureComponent<CompanySearchResultsTopTabProps> {
  public override render(): React.JSX.Element {
    return (
      <SearchResultsList
        data={this.props.data}
        renderItem={({ item, index }) => (
          <CompanySearchCard
            item={item}
            index={index}
            listLength={this.props.data?.length}
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
