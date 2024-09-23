import React from 'react';
import type { DebouncedFunc } from 'lodash';
import debounce from 'lodash/debounce';

import { PersonSearchCard, SearchResultsList } from '@components';
import { PersonService } from '@services';
import type {
  PersonSearchResultsTopTabProps,
  PersonSearchResultsTopTabState,
} from '@shared/types';

class PersonSearchResultsTopTab extends React.PureComponent<
  PersonSearchResultsTopTabProps,
  PersonSearchResultsTopTabState
> {
  private debouncedSearchPeople: DebouncedFunc<
    (content: string) => Promise<void>
  >;

  public constructor(props: PersonSearchResultsTopTabProps) {
    super(props);
    this.state = {
      people: [],
    };

    this.debouncedSearchPeople = debounce(this.searchPeople, 350);
  }

  private async searchPeople(content: string): Promise<void> {
    const personResponse = await PersonService.searchAsync(content);
    this.setState({ people: personResponse.getResults() });
  }

  public override componentDidMount(): void {
    if (this.props.searchContent.trim() === '') {
      return;
    }

    this.searchPeople(this.props.searchContent);
  }

  public override async componentDidUpdate(
    prevProps: Readonly<PersonSearchResultsTopTabProps>,
  ): Promise<void> {
    if (this.props.searchContent === prevProps.searchContent) {
      return;
    }

    if (this.props.searchContent.trim() === '') {
      this.setState({ people: [] });
      return;
    }

    this.debouncedSearchPeople(this.props.searchContent);
  }

  public override render(): React.JSX.Element {
    return (
      <SearchResultsList
        data={this.state.people}
        renderItem={({ item, index }) => (
          <PersonSearchCard
            item={item}
            index={index}
            listLength={this.state.people?.length}
            onPress={() => {
              this.props.navigation.navigate('PersonDetailScreen', {
                personId: item.id,
              });
            }}
          />
        )}
      />
    );
  }
}

export default PersonSearchResultsTopTab;
