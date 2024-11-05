import React from 'react';
import { Text, type ListRenderItemInfo } from 'react-native';

import type { Cast, CreditProps, CreditState } from '@shared/types';
import { Section } from '@components';
import styles from './style';
import { VideoService } from '@services';

class Credit extends React.PureComponent<CreditProps, CreditState> {
  public constructor(props: CreditProps) {
    super(props);
    this.state = {
      credits: undefined,
      isFetching: true,
      error: undefined,
    };

    this.renderItem = this.renderItem.bind(this);
  }

  public override async componentDidMount(): Promise<void> {
    try {
      const credits = await VideoService.getCreditsAsync(
        this.props.type,
        this.props.id,
      );

      this.setState({ credits, isFetching: false });
    } catch (error: unknown) {
      this.setState({ error: error as Error });
    }
  }

  public renderItem({ item, index }: ListRenderItemInfo<Cast>) {
    return <Text style={styles.name}>{item.name}</Text>;
  }

  public override render(): React.JSX.Element {
    if (this.state.error) {
      return (
        <Section.Content>
          <Section.Label
            name={this.state.error.name}
            value={this.state.error.message}
          />
        </Section.Content>
      );
    }

    return (
      <Section.HorizontalList
        loading={this.state.isFetching}
        noResultText='No one found.'
        keyExtractor={item => item.id.toString()}
        data={this.state.credits?.cast || []}
        renderItem={this.renderItem}
      />
    );
  }
}

export default Credit;
