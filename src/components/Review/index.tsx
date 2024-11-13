import React from 'react';
import { Text, type ListRenderItemInfo } from 'react-native';

import type {
  Review as ReviewType,
  ReviewProps,
  ReviewState,
} from '@shared/types';
import { Section } from '@components';
import { VideoService } from '@services';
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
    return (
      <Text style={styles.content} numberOfLines={8}>
        {item.content}
      </Text>
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
