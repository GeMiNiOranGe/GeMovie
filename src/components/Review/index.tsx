import React from 'react';
import { Text, View, type ListRenderItemInfo } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

import type {
  Review as ReviewType,
  ReviewProps,
  ReviewState,
} from '@shared/types';
import { Section, VoteLabel } from '@components';
import { VideoService } from '@services';
import { spacing } from '@shared/constants';
import { getFormattedDate } from '@shared/utils';
import { layout } from '@shared/themes';
import styles from './style';

class Review extends React.PureComponent<ReviewProps, ReviewState> {
  public constructor(props: ReviewProps) {
    super(props);
    this.state = {
      reviews: undefined,
      isFetching: true,
      error: undefined,
    };

    this.renderItem = this.renderItem.bind(this);
  }

  public override async componentDidMount(): Promise<void> {
    try {
      const reviews = await VideoService.getReviewsAsync(
        this.props.type,
        this.props.id,
      );

      this.setState({ reviews, isFetching: false });
    } catch (error: unknown) {
      this.setState({ error: error as Error });
    }
  }

  public renderItem({ item, index }: ListRenderItemInfo<ReviewType>) {
    const marginRight: number =
      index === (this.state.reviews?.results.length || 0) - 1
        ? 0
        : spacing.large;

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
                type='absolute'
                showThreshold
              />
            )}

            <Text style={[layout.flex1, styles.author]}>
              A review written on {getFormattedDate(item.createdAt)} by{' '}
              <Text style={styles.authorName}>{item.author}</Text>
            </Text>
          </View>

          <Text style={styles.content} numberOfLines={8}>
            {item.content}
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
      <Section.HorizontalList
        loading={this.state.isFetching}
        noResultText='No reviews found.'
        keyExtractor={item => item.id.toString()}
        data={this.state.reviews?.results}
        renderItem={this.renderItem}
      />
    );
  }
}

export default Review;
