import React from 'react';
import { ListRenderItem } from 'react-native';

import { SearchResultsTopTabBase } from '@base';
import { PersonSearchCard } from '@components';
import { PersonService } from '@services';
import type {
  PersonElement,
  SearchResultsTopTabBaseProps,
} from '@shared/types';

class PersonSearchResultsTopTab extends SearchResultsTopTabBase<PersonElement> {
  public constructor(props: SearchResultsTopTabBaseProps) {
    super(props, PersonService.searchAsync);
  }

  protected override keyExtractor(item: PersonElement): string {
    return item.id.toString();
  }

  protected override get noResultsSubtext(): string | undefined {
    return 'No one found';
  }

  protected override renderItem: ListRenderItem<PersonElement> = ({
    item,
    index,
  }) => (
    <PersonSearchCard
      item={item}
      index={index}
      listLength={this.state.results?.length}
      onPress={() => {
        this.props.navigation.navigate('PersonDetailScreen', {
          personId: item.id,
        });
      }}
    />
  );
}

export default PersonSearchResultsTopTab;
