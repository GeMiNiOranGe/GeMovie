import React from 'react';
import { Text, View, type ListRenderItemInfo } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

import type { Cast, CreditProps, CreditState } from '@shared/types';
import { Section, TMDBImage } from '@components';
import { VideoService } from '@services';
import { spacing } from '@shared/constants';
import { layout } from '@shared/themes';
import styles from './style';

const endPosition = 15;

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
    const marginRight: number =
      index === (this.state.credits?.cast.slice(0, endPosition).length || 0) - 1
        ? 0
        : spacing.large;

    return (
      <TouchableRipple
        style={[styles.card, { marginRight }]}
        onPress={() => {
          this.props.navigation.push('PersonDetailScreen', {
            personId: item.id,
          });
        }}
      >
        <>
          <View style={[layout.center, styles.profileBox]}>
            <TMDBImage
              style={styles.profile}
              path={item.profilePath}
              size='w185'
            />
          </View>

          <Text style={styles.name} numberOfLines={2}>
            {item.name}
            {'\n'}
          </Text>

          <Text style={styles.character} numberOfLines={1}>
            {item.character}
          </Text>
        </>
      </TouchableRipple>
    );
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
      <>
        <Section.HorizontalList
          loading={this.state.isFetching}
          noResultText='No one found.'
          keyExtractor={item => item.id.toString()}
          data={this.state.credits?.cast.slice(0, endPosition)}
          renderItem={this.renderItem}
        />

        <Section.Content>
          <Section.Divider />

          <Section.Label
            name='Director'
            value={`${this.state.credits?.crew
              .filter(element => element.job === 'Director')
              .map(element => element.name)
              .join(', ')}`}
          />

          <Section.Divider />

          <Section.Label
            name='Writer'
            value={`${this.state.credits?.crew
              .filter(element => element.job === 'Writer')
              .map(element => element.name)
              .join(', ')}`}
          />
        </Section.Content>
      </>
    );
  }
}

export default Credit;
