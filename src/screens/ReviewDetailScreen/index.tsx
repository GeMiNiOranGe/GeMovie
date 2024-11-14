import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { ReviewDetailScreenState, RootScreenProps } from '@shared/types';
import { ReviewService } from '@services';
import { FullScreenLoader } from '@components';
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
        <Text style={styles.text}>Review detail screen</Text>
      </SafeAreaView>
    );
  }
}

export default ReviewDetailScreen;
