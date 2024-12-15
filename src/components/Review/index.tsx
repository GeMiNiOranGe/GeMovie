import React from 'react';
import { Text, View, type ListRenderItemInfo } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Markdown, {
  RenderRules,
} from '@ronradtke/react-native-markdown-display';

import type {
  DetailsSectionProps,
  DetailsSectionState,
  ReviewElement,
  Reviews,
} from '@shared/types';
import { Section, VoteLabel } from '@components';
import { VideoService } from '@services';
import { spacing } from '@shared/constants';
import { normalizeMarkdown, getFormattedDate } from '@shared/utils';
import { layout } from '@shared/themes';
import styles from './style';

const rules: RenderRules = {
  textgroup: (node, children, parent, nativeStyles) => (
    <Text
      key={node.key}
      style={[nativeStyles.textgroup, styles.content]}
      numberOfLines={8}
    >
      {children}
    </Text>
  ),
};

class Review extends React.PureComponent<
  DetailsSectionProps,
  DetailsSectionState<Reviews | undefined>
> {
  public constructor(props: DetailsSectionProps) {
    super(props);
    this.state = {
      results: undefined,
      isFetching: true,
      error: undefined,
    };

    this.renderItem = this.renderItem.bind(this);
  }

  public override async componentDidMount(): Promise<void> {
    try {
      const results = await VideoService.getReviewsAsync(
        this.props.type,
        this.props.id,
      );

      this.setState({ results, isFetching: false });
    } catch (error: unknown) {
      this.setState({ error: error as Error });
    }
  }

  public renderItem({
    item,
    index,
  }: ListRenderItemInfo<ReviewElement>): React.JSX.Element {
    const marginRight: number =
      index === (this.state.results?.results.length || 0) - 1
        ? 0
        : spacing.large;

    const contentNormalized = normalizeMarkdown(item.content);
    const paragraphs = contentNormalized.split('\r\n');
    const firstParagraph = paragraphs[0];

    return (
      <TouchableRipple
        style={[styles.card, { marginRight }]}
        borderless
        onPress={() => {
          this.props.navigation.push('ReviewDetailScreen', {
            reviewId: item.id,
          });
        }}
      >
        <>
          <View style={[layout.row, layout.itemsCenter, styles.authorBox]}>
            {item.authorDetails.rating && (
              <VoteLabel
                style={styles.rating}
                valueStyle={styles.ratingValue}
                value={item.authorDetails.rating}
                valueType='absolute'
                showThreshold
              />
            )}

            <Text style={[layout.flex1, styles.author]}>
              A review written on {getFormattedDate(item.createdAt)} by{' '}
              <Text style={styles.authorName}>{item.author}</Text>
            </Text>
          </View>

          <Markdown rules={rules}>
            {`${firstParagraph}${paragraphs.length > 1 ? '...' : ''}`}
          </Markdown>

          <Text style={styles.readDetails}>Read details</Text>
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
      <Section.HorizontalList
        loading={this.state.isFetching}
        noResultText='No reviews found.'
        keyExtractor={item => item.id.toString()}
        data={this.state.results?.results}
        renderItem={this.renderItem}
      />
    );
  }
}

export default Review;
