import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Markdown from '@ronradtke/react-native-markdown-display';

import type { ReviewDetailScreenState, RootScreenProps } from '@shared/types';
import { ReviewService } from '@services';
import { FullScreenLoader, VoteLabel } from '@components';
import { getFormattedDate, normalizeMarkdown } from '@shared/utils';
import { layout } from '@shared/themes';
import styles from './style';

class ReviewDetailScreen extends React.PureComponent<
  RootScreenProps<'ReviewDetailScreen'>,
  ReviewDetailScreenState
> {
  public constructor(props: RootScreenProps<'ReviewDetailScreen'>) {
    super(props);
    this.state = {
      review: undefined,
    };
  }

  public override async componentDidMount(): Promise<void> {
    const { reviewId } = this.props.route.params;

    const review = await ReviewService.getDetailAsync(reviewId);
    this.setState({ review });
  }

  public override render(): React.JSX.Element {
    if (!this.state.review) {
      return <FullScreenLoader />;
    }

    return (
      <SafeAreaView style={[layout.flex1, styles.container]}>
        <ScrollView contentContainerStyle={styles.containerScrollView}>
          <View style={[layout.row, layout.itemsCenter]}>
            {this.state.review.authorDetails.rating && (
              <VoteLabel
                style={styles.rating}
                valueStyle={styles.ratingValue}
                value={this.state.review.authorDetails.rating}
                valueType='absolute'
                showThreshold
              />
            )}

            <Text style={[layout.flex1, styles.author]}>
              Written by{' '}
              <Text style={styles.authorName}>{this.state.review.author}</Text>{' '}
              on {getFormattedDate(this.state.review.createdAt)}
            </Text>
          </View>

          <Markdown style={{ text: styles.text }}>
            {normalizeMarkdown(this.state.review.content)}
          </Markdown>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default ReviewDetailScreen;
